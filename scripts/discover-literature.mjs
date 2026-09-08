import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const siteRoot = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const gabaRoot = resolve(siteRoot, "..");
const formatKstDate = (date) => new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(date);
const snapshotDate = formatKstDate(new Date());
const outputArg = process.argv.find((value) => value.startsWith("--out="));
const outputDir = outputArg
  ? resolve(outputArg.slice("--out=".length))
  : resolve(gabaRoot, "outputs", `literature-search-${snapshotDate}`);
const maxCandidatesArg = process.argv.find((value) => value.startsWith("--max-candidates="));
const maxCandidates = Number(maxCandidatesArg?.split("=")[1] || 1000);
const sinceArg = process.argv.find((value) => value.startsWith("--since="));
const overlapDaysArg = process.argv.find((value) => value.startsWith("--overlap-days="));
const overlapDays = Number(overlapDaysArg?.split("=")[1] || 60);
const overlapStart = sinceArg?.split("=")[1]
  || formatKstDate(new Date(Date.now() - overlapDays * 86400000));

const database = JSON.parse(await readFile(resolve(siteRoot, "worker", "data.json"), "utf8"));
const existing = database.records.filter((record) => record.kind !== "규제");

const PUBMED_QUERIES = [
  {
    label: "human_direct",
    term: `(
      "gamma-aminobutyric acid"[Title/Abstract] OR GABA[Title]
    ) AND (
      oral[Title/Abstract] OR orally[Title/Abstract] OR ingestion[Title/Abstract]
      OR intake[Title/Abstract] OR supplement*[Title/Abstract]
      OR beverage[Title/Abstract] OR drink*[Title/Abstract]
      OR food[Title/Abstract] OR consumption[Title/Abstract]
    ) AND (
      humans[MeSH Terms] OR clinical trial[Publication Type]
      OR randomized controlled trial[Publication Type]
    ) NOT (
      review[Publication Type] OR meta-analysis[Publication Type]
      OR systematic review[Publication Type]
    )`
  },
  {
    label: "animal_direct",
    term: `(
      "gamma-aminobutyric acid"[Title/Abstract] OR GABA[Title]
    ) AND (
      oral[Title/Abstract] OR orally[Title/Abstract] OR gavage[Title/Abstract]
      OR diet*[Title/Abstract] OR feed[Title/Abstract] OR fed[Title/Abstract]
      OR feeding[Title/Abstract] OR "drinking water"[Title/Abstract]
      OR supplementation[Title/Abstract] OR supplemented[Title/Abstract]
    ) AND animals[MeSH Terms] NOT (
      review[Publication Type] OR meta-analysis[Publication Type]
      OR systematic review[Publication Type]
    )`
  },
  {
    label: "livestock_aquaculture",
    term: `(
      "gamma-aminobutyric acid"[Title/Abstract] OR GABA[Title]
    ) AND (
      broiler[Title/Abstract] OR poultry[Title/Abstract] OR chicken[Title/Abstract]
      OR laying hen[Title/Abstract] OR pig[Title/Abstract] OR swine[Title/Abstract]
      OR cattle[Title/Abstract] OR cow[Title/Abstract] OR goat[Title/Abstract]
      OR sheep[Title/Abstract] OR rabbit[Title/Abstract] OR fish[Title/Abstract]
      OR shrimp[Title/Abstract] OR aquaculture[Title/Abstract]
    ) AND (
      diet*[Title/Abstract] OR feed[Title/Abstract] OR fed[Title/Abstract]
      OR feeding[Title/Abstract] OR supplementation[Title/Abstract]
      OR "drinking water"[Title/Abstract]
    ) NOT review[Publication Type]`
  },
  {
    label: "food_matrix",
    term: `(
      "GABA-enriched"[Title/Abstract] OR "GABA enriched"[Title/Abstract]
      OR "GABA-rich"[Title/Abstract] OR "GABA rich"[Title/Abstract]
      OR "gamma-aminobutyric acid-enriched"[Title/Abstract]
    ) AND (
      trial[Title/Abstract] OR participants[Title/Abstract] OR subjects[Title/Abstract]
      OR rats[Title/Abstract] OR mice[Title/Abstract] OR animals[MeSH Terms]
      OR humans[MeSH Terms]
    ) NOT review[Publication Type]`
  },
  {
    label: "safety_toxicology",
    term: `(
      "gamma-aminobutyric acid"[Title/Abstract] OR GABA[Title]
    ) AND (
      safety[Title/Abstract] OR toxic*[Title/Abstract] OR tolerability[Title/Abstract]
      OR adverse[Title/Abstract] OR NOAEL[Title/Abstract]
    ) AND (
      oral[Title/Abstract] OR gavage[Title/Abstract] OR diet*[Title/Abstract]
      OR intake[Title/Abstract] OR supplementation[Title/Abstract]
    ) NOT review[Publication Type]`
  },
  {
    label: "human_negative_null_adverse",
    term: `(
      "gamma-aminobutyric acid"[Title/Abstract] OR GABA[Title]
    ) AND (
      negative[Title/Abstract] OR null[Title/Abstract] OR no effect[Title/Abstract]
      OR impairment[Title/Abstract] OR worsened[Title/Abstract]
      OR adverse[Title/Abstract] OR tolerability[Title/Abstract]
      OR cognitive flexibility[Title/Abstract] OR attention[Title/Abstract]
    ) AND (
      oral[Title/Abstract] OR intake[Title/Abstract] OR supplement*[Title/Abstract]
      OR ingestion[Title/Abstract] OR administration[Title/Abstract]
    ) AND (humans[MeSH Terms] OR clinical trial[Publication Type]) NOT (
      review[Publication Type] OR meta-analysis[Publication Type]
      OR systematic review[Publication Type]
    )`
  },
  {
    label: "human_combination_exercise_product",
    term: `(
      "gamma-aminobutyric acid"[Title/Abstract] OR GABA[Title]
    ) AND (
      exercise[Title/Abstract] OR training[Title/Abstract] OR caffeine[Title/Abstract]
      OR theanine[Title/Abstract] OR probiotic*[Title/Abstract]
      OR fermented[Title/Abstract] OR skin[Title/Abstract]
    ) AND (
      oral[Title/Abstract] OR intake[Title/Abstract] OR supplement*[Title/Abstract]
      OR ingestion[Title/Abstract] OR administration[Title/Abstract]
    ) AND (humans[MeSH Terms] OR clinical trial[Publication Type]
      OR randomized controlled trial[Publication Type]) NOT (
      review[Publication Type] OR meta-analysis[Publication Type]
      OR systematic review[Publication Type]
    )`
  },
  {
    label: "human_cognitive_sleep_stress_outcomes",
    term: `(
      "gamma-aminobutyric acid"[Title/Abstract] OR GABA[Title/Abstract]
    ) AND (
      cognition[Title/Abstract] OR cognitive[Title/Abstract] OR memory[Title/Abstract]
      OR attention[Title/Abstract] OR sleep[Title/Abstract] OR stress[Title/Abstract]
      OR anxiety[Title/Abstract] OR mood[Title/Abstract] OR relaxation[Title/Abstract]
    ) AND (
      oral[Title/Abstract] OR intake[Title/Abstract] OR supplement*[Title/Abstract]
      OR ingestion[Title/Abstract] OR administration[Title/Abstract]
    ) AND (humans[MeSH Terms] OR clinical trial[Publication Type]
      OR randomized controlled trial[Publication Type]) NOT (
      review[Publication Type] OR meta-analysis[Publication Type]
      OR systematic review[Publication Type]
    )`
  },
  {
    label: "publication_followup",
    term: `(
      "gamma-aminobutyric acid"[Title/Abstract] OR GABA[Title]
    ) AND (
      "retracted publication"[Publication Type]
      OR retraction[Title/Abstract]
      OR retracted[Title/Abstract]
      OR "expression of concern"[Title/Abstract]
      OR correction[Publication Type]
    )`
  },
  {
    label: "recent_2024_plus",
    term: `(
      "gamma-aminobutyric acid"[Title/Abstract] OR GABA[Title]
    ) AND (
      oral[Title/Abstract] OR intake[Title/Abstract] OR supplement*[Title/Abstract]
      OR gavage[Title/Abstract] OR diet*[Title/Abstract] OR feed[Title/Abstract]
      OR "drinking water"[Title/Abstract] OR beverage[Title/Abstract]
    ) AND ("2024/01/01"[Date - Publication] : "3000"[Date - Publication])
    NOT review[Publication Type]`
  }
];

const OPENALEX_QUERIES = [
  "gamma aminobutyric acid oral supplementation",
  "GABA dietary supplementation animal",
  "GABA drinking water broiler poultry",
  "GABA feed aquaculture fish shrimp",
  "GABA enriched food clinical trial human",
  "gamma aminobutyric acid safety oral toxicity",
  "GABA negative cognition null trial adverse events",
  "GABA gavage rat mouse",
  "GABA beverage intake human",
  "GABA exercise supplementation randomized human",
  "GABA caffeine crossover human",
  "GABA theanine sleep trial",
  "GABA fermented rice germ skin clinical trial"
  ,"GABA cognitive sleep stress human trial"
];

const CROSSREF_QUERIES = [
  "gamma-aminobutyric acid oral supplementation",
  "GABA randomized placebo human",
  "GABA dietary supplementation animal",
  "GABA safety oral toxicity",
  "GABA exercise supplementation human",
  "GABA caffeine crossover trial",
  "GABA theanine sleep human",
  "GABA fermented food clinical trial"
  ,"GABA cognition memory sleep randomized human"
];

const pause = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const normalizeDoi = (value) => clean(value).toLowerCase()
  .replace(/^https?:\/\/(?:dx\.)?doi\.org\//, "")
  .replace(/[?#].*$/, "")
  .replace(/[).,;]+$/, "");
const normalizeTitle = (value) => clean(value).toLowerCase().normalize("NFKC")
  .replace(/<[^>]+>/g, " ")
  .replace(/&[a-z]+;/g, " ")
  .replace(/[^\p{L}\p{N}]+/gu, " ")
  .replace(/\s+/g, " ")
  .trim();
const decodeXml = (value) => clean(String(value ?? "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, "\"")
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
  .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number(decimal))));
const first = (block, pattern) => {
  const match = String(block ?? "").match(pattern);
  return match ? decodeXml(match[1]) : "";
};
const fetchWithTimeout = (url, options = {}, timeoutMs = 30_000) => fetch(url, {
  ...options,
  signal: AbortSignal.timeout(timeoutMs)
});

async function getJson(url, retries = 6, timeoutMs = 30_000) {
  let error;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchWithTimeout(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "GABA-evidence-index/2.0 (systematic literature discovery)"
        }
      }, timeoutMs);
      // Await body decoding inside the retry boundary. A dropped connection can
      // fail while the response body is streaming even after headers succeeded.
      if (response.ok) return await response.json();
      error = new Error(`${response.status} ${response.statusText}: ${url}`);
      if ((response.status === 429 || response.status >= 500) && attempt < retries) {
        const retryAfter = Number(response.headers.get("retry-after") || 0);
        await pause(Math.max(retryAfter * 1000, 5000 * attempt));
      }
    } catch (fetchError) {
      error = fetchError;
    }
    await pause(500 * attempt);
  }
  throw error;
}

async function getText(url, retries = 6) {
  let error;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchWithTimeout(url, {
        headers: { "User-Agent": "GABA-evidence-index/2.0 (systematic literature discovery)" }
      });
      if (response.ok) return await response.text();
      error = new Error(`${response.status} ${response.statusText}: ${url}`);
    } catch (fetchError) {
      error = fetchError;
    }
    await pause(500 * attempt);
  }
  throw error;
}

async function searchPubMed(query) {
  const params = new URLSearchParams({
    db: "pubmed",
    term: query.term.replace(/\s+/g, " ").trim(),
    retmode: "json",
    retmax: "10000",
    sort: "pub date"
  });
  const data = await getJson(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?${params}`);
  return {
    label: query.label,
    ids: data.esearchresult?.idlist ?? [],
    count: Number(data.esearchresult?.count || 0)
  };
}

async function searchPubMedOverlap(query) {
  const params = new URLSearchParams({
    db: "pubmed",
    term: query.term.replace(/\s+/g, " ").trim(),
    retmode: "json",
    retmax: "10000",
    sort: "pub date",
    datetype: "mdat",
    mindate: overlapStart.replaceAll("-", "/"),
    maxdate: snapshotDate.replaceAll("-", "/")
  });
  const data = await getJson(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?${params}`);
  return {
    label: query.label,
    ids: data.esearchresult?.idlist ?? [],
    count: Number(data.esearchresult?.count || 0)
  };
}

async function fetchPubMedArticles(ids) {
  const articles = [];
  for (let start = 0; start < ids.length; start += 200) {
    const chunk = ids.slice(start, start + 200);
    const params = new URLSearchParams({
      db: "pubmed",
      id: chunk.join(","),
      retmode: "xml"
    });
    const xml = await getText(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?${params}`);
    for (const match of xml.matchAll(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g)) {
      const block = match[1];
      // PubMed blocks may contain identifiers for cited references. Restrict ID
      // extraction to the primary ArticleIdList, otherwise a cited PMID/DOI can
      // silently overwrite the identifier of the article being screened.
      const primaryIdList = block.match(/<PubmedData>[\s\S]*?<ArticleIdList>([\s\S]*?)<\/ArticleIdList>/)?.[1] || "";
      const articleIds = Object.fromEntries(
        [...primaryIdList.matchAll(/<ArticleId IdType="([^"]+)">([\s\S]*?)<\/ArticleId>/g)]
          .map((idMatch) => [idMatch[1], decodeXml(idMatch[2])])
      );
      const primaryPmid = first(block, /<MedlineCitation[^>]*>[\s\S]*?<PMID[^>]*>([\s\S]*?)<\/PMID>/);
      const authors = [...block.matchAll(/<Author\b[\s\S]*?<\/Author>/g)]
        .map((authorMatch) => {
          const author = authorMatch[0];
          return [
            first(author, /<LastName>([\s\S]*?)<\/LastName>/),
            first(author, /<Initials>([\s\S]*?)<\/Initials>/)
          ].filter(Boolean).join(" ");
        })
        .filter(Boolean);
      const abstract = [...block.matchAll(/<AbstractText(?:\s+Label="([^"]*)")?[^>]*>([\s\S]*?)<\/AbstractText>/g)]
        .map((abstractMatch) => `${abstractMatch[1] ? `${abstractMatch[1]}: ` : ""}${decodeXml(abstractMatch[2])}`)
        .join(" ");
      const publicationTypes = [...block.matchAll(/<PublicationType[^>]*>([\s\S]*?)<\/PublicationType>/g)]
        .map((typeMatch) => decodeXml(typeMatch[1]));
      const yearText = first(block, /<PubDate>[\s\S]*?<Year>([\s\S]*?)<\/Year>/)
        || first(block, /<ArticleDate[^>]*>[\s\S]*?<Year>([\s\S]*?)<\/Year>/)
        || first(block, /<PubDate>[\s\S]*?<MedlineDate>([\s\S]*?)<\/MedlineDate>/);
      articles.push({
        source: ["PubMed"],
        pmid: primaryPmid || articleIds.pubmed,
        pmcid: articleIds.pmc || "",
        doi: normalizeDoi(articleIds.doi || ""),
        title: first(block, /<ArticleTitle>([\s\S]*?)<\/ArticleTitle>/),
        abstract,
        authors,
        author: authors[0] || "",
        journal: first(block, /<Title>([\s\S]*?)<\/Title>/),
        year: Number(String(yearText).match(/\d{4}/)?.[0]) || null,
        publicationTypes,
        sourceUrl: articleIds.pubmed ? `https://pubmed.ncbi.nlm.nih.gov/${articleIds.pubmed}/` : "",
        queryLabels: []
      });
    }
    await pause(350);
  }
  return articles;
}

function restoreOpenAlexAbstract(invertedIndex) {
  if (!invertedIndex || typeof invertedIndex !== "object") return "";
  const words = [];
  for (const [word, positions] of Object.entries(invertedIndex)) {
    for (const position of positions) words[position] = word;
  }
  return clean(words.join(" "));
}

async function searchOpenAlex(query, index) {
  const params = new URLSearchParams({
    search: query,
    "per-page": "100",
    page: "1"
  });
  const data = await getJson(`https://api.openalex.org/works?${params}`, 1, 8_000);
  return {
    label: `openalex_${String(index + 1).padStart(2, "0")}`,
    query,
    count: Number(data.meta?.count || 0),
    records: (data.results ?? []).map((work) => ({
      source: ["OpenAlex"],
      openAlexId: clean(work.id).split("/").at(-1) || "",
      pmid: clean(work.ids?.pmid).split("/").at(-1) || "",
      pmcid: clean(work.ids?.pmcid).split("/").at(-1) || "",
      doi: normalizeDoi(work.doi || work.ids?.doi || ""),
      title: clean(work.title),
      abstract: restoreOpenAlexAbstract(work.abstract_inverted_index),
      authors: (work.authorships ?? []).map((item) => clean(item.author?.display_name)).filter(Boolean),
      author: clean(work.authorships?.[0]?.author?.display_name),
      journal: clean(work.primary_location?.source?.display_name),
      year: Number(work.publication_year) || null,
      publicationTypes: [clean(work.type)].filter(Boolean),
      sourceUrl: clean(work.primary_location?.landing_page_url || work.id),
      queryLabels: [`openalex_${String(index + 1).padStart(2, "0")}`]
    }))
  };
}

async function searchCrossref(query, index) {
  const params = new URLSearchParams({
    query,
    rows: "100",
    filter: `from-pub-date:${overlapStart},until-pub-date:${snapshotDate}`,
    select: "DOI,title,author,container-title,published,URL,type,abstract"
  });
  const data = await getJson(`https://api.crossref.org/works?${params}`, 3, 30_000);
  return {
    label: `crossref_${String(index + 1).padStart(2, "0")}`,
    query,
    count: Number(data.message?.["total-results"] || 0),
    records: (data.message?.items ?? []).map((work) => ({
      source: ["Crossref"],
      doi: normalizeDoi(work.DOI || ""),
      title: clean(work.title?.[0]),
      abstract: decodeXml(work.abstract || ""),
      authors: (work.author ?? []).map((item) => clean(`${item.given || ""} ${item.family || ""}`)).filter(Boolean),
      author: clean(`${work.author?.[0]?.given || ""} ${work.author?.[0]?.family || ""}`),
      journal: clean(work["container-title"]?.[0]),
      year: Number(work.published?.["date-parts"]?.[0]?.[0]) || null,
      publicationTypes: [clean(work.type)].filter(Boolean),
      sourceUrl: clean(work.URL || (work.DOI ? `https://doi.org/${work.DOI}` : "")),
      queryLabels: [`crossref_${String(index + 1).padStart(2, "0")}`]
    }))
  };
}

function tokenSet(value) {
  return new Set(normalizeTitle(value).split(" ").filter((token) => token.length > 1));
}

function jaccard(left, right) {
  const a = tokenSet(left);
  const b = tokenSet(right);
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function candidateKey(record) {
  if (record.doi) return `doi:${record.doi}`;
  if (record.pmid) return `pmid:${record.pmid}`;
  return `title:${normalizeTitle(record.title)}`;
}

function mergeRecord(target, incoming) {
  target.source = [...new Set([...(target.source ?? []), ...(incoming.source ?? [])])];
  target.queryLabels = [...new Set([...(target.queryLabels ?? []), ...(incoming.queryLabels ?? [])])];
  for (const field of [
    "pmid", "pmcid", "doi", "title", "abstract", "author", "journal",
    "year", "sourceUrl", "openAlexId"
  ]) {
    if (!target[field] && incoming[field]) target[field] = incoming[field];
  }
  if ((incoming.abstract?.length ?? 0) > (target.abstract?.length ?? 0)) target.abstract = incoming.abstract;
  if ((incoming.authors?.length ?? 0) > (target.authors?.length ?? 0)) target.authors = incoming.authors;
  target.publicationTypes = [...new Set([...(target.publicationTypes ?? []), ...(incoming.publicationTypes ?? [])])];
  return target;
}

const directRoutePatterns = [
  /\boral(?:ly)?\b/i, /\bingest(?:ion|ed|ing)?\b/i, /\bintake\b/i,
  /\bgavage\b/i, /\bdiet(?:ary)?\b/i, /\bfeed(?:ing)?\b/i, /\bfed\b/i,
  /\bdrinking water\b/i, /\bsupplement(?:ation|ed|ing)?\b/i,
  /\bconsum(?:ption|ed|ing)\b/i, /\bbeverage\b/i, /\brumen-protected\b/i
];
const interventionPatterns = [
  /\badministr(?:ation|ed)\b/i, /\btreat(?:ment|ed)\b/i, /\bdose[sd]?\b/i,
  /\btrial\b/i, /\brandomi[sz]ed\b/i, /\bintervention\b/i,
  /\beffect(?:s)? of (?:gaba|gamma[- ]aminobutyric acid)\b/i
];
const subjectPatterns = [
  /\bparticipants?\b/i, /\bpatients?\b/i, /\bvolunteers?\b/i,
  /\bhumans?\b/i, /\brats?\b/i, /\bmice\b/i, /\bmouse\b/i,
  /\bbroilers?\b/i, /\bchickens?\b/i, /\bhens?\b/i, /\bpigs?\b/i,
  /\bswine\b/i, /\bcows?\b/i, /\bcattle\b/i, /\bcalves?\b/i,
  /\bgoats?\b/i, /\bsheep\b/i, /\brabbits?\b/i, /\bfish\b/i,
  /\bshrimp\b/i, /\bprawn\b/i
];
const studyPatterns = [
  /\bdouble[- ]blind\b/i, /\bplacebo\b/i, /\bcrossover\b/i,
  /\bcontrolled\b/i, /\bgroup(?:s)?\b/i, /\bweeks?\b/i, /\bdays?\b/i,
  /\bmg\/kg\b/i, /\bg\/kg\b/i, /\bmg\b/i, /\bppm\b/i, /\b%/
];
const hardExclusionPatterns = [
  /\bintracerebral\b/i, /\bintracranial\b/i, /\bintrathecal\b/i,
  /\bintraventricular\b/i, /\blateral (?:brain )?ventric(?:le|ular)\b/i,
  /\bmicroinject(?:ion|ed)\b/i, /\binject(?:ion|ed)\b/i,
  /\bintraperitoneal\b/i, /\bintravenous\b/i, /\bsubcutaneous\b/i,
  /\bgabapentin\b/i, /\bpregabalin\b/i, /\bbaclofen\b/i,
  /\bvalpro(?:ic acid|ate)\b/i, /\bmidazolam\b/i, /\bbasmisanil\b/i,
  /\bcipepofol\b/i, /\bbenzodiazepine(?:s)?\b/i,
  /\bvigabatrin\b/i, /\bgamma[- ]vinyl gaba\b/i, /\bgaba[- ]transaminase inhibitor\b/i,
  /\breceptor agonist\b/i, /\breceptor antagonist\b/i,
  /\bmagnetic resonance spectroscopy\b/i, /\bMRS\b/,
  /\bmagnetic resonance imag(?:e|ing)\b/i,
  /\bbrain gaba (?:level|concentration)\b/i,
  /\bretract(?:ed|ion)\b/i,
  /\bexpression of concern\b/i,
  /\bcorrection\b/i
];
const productionOnlyPatterns = [
  /\bfermentation\b/i, /\bproducer strain\b/i, /\bbiosynthesis\b/i,
  /\bfood development\b/i, /\bsensory evaluation\b/i, /\boptimization\b/i,
  /\bprocess parameter\b/i, /\bgermination\b/i, /\bdrought\b/i,
  /\bsalt stress\b/i, /\bplant growth\b/i, /\bseedling\b/i,
  /\brice\b/i, /\bchlorella\b/i, /\bmicroalgae\b/i, /\balgae\b/i,
  /\bin vitro\b/i, /\bcell line\b/i
];
const directTitlePatterns = [
  /\b(?:dietary|oral|orally administered|supplemental)\s+(?:gaba|gamma[- ]aminobutyric acid)\b/i,
  /\b(?:gaba|gamma[- ]aminobutyric acid)\s+(?:supplementation|administration|treatment|intake|ingestion|consumption|feeding)\b/i,
  /\b(?:supplemented|treated|fed)\s+with\s+(?:gaba|gamma[- ]aminobutyric acid)\b/i,
  /\beffects?\s+of\s+(?:gaba|gamma[- ]aminobutyric acid)\b/i,
  /\binfluence\s+of\s+(?:gaba|gamma[- ]aminobutyric acid)\b/i,
  /\b(?:gaba|gamma[- ]aminobutyric acid)[- ](?:enriched|fortified)\b/i,
  /\bdrinking water supplemented with (?:gaba|gamma[- ]aminobutyric acid)\b/i,
  /\b(?:gaba|gamma[- ]aminobutyric acid)\s+and\s+\w+\s+combination therapy\b/i
];
const indirectTitlePatterns = [
  /\bgaba(?:ergic)?\s+(?:receptor|signaling|system|neuron|neurons|release|uptake|transport|level|concentration|expression|dynamics|inhibition)\b/i,
  /\bgaba[- ]mediated\b/i, /\bgaba[- ]a\b/i, /\bgaba\s*\([ab]\)/i,
  /\b(?:agonist|antagonist|modulator|derivative|derivatives|ester|transaminase inhibitor)\b/i,
  /\b(?:produce|producing|production|biosynthesis|synthesis) of (?:gaba|gamma[- ]aminobutyric acid)\b/i,
  /\b(?:gaba|gamma[- ]aminobutyric acid)[- ]producing\b/i,
  /\b(?:gaba|gamma[- ]aminobutyric acid)\s+(?:content|bioaccessibility|enrichment)\b/i,
  /\b(?:development|optimization|characterization) of\b/i,
  /\b(?:cell|cells|cellular|cell line|in vitro)\b/i
];

function scoreRecord(record) {
  const title = clean(record.title);
  const text = `${title} ${clean(record.abstract)} ${(record.publicationTypes ?? []).join(" ")}`;
  const gabaTitle = /\bgaba\b|gamma[- ]aminobutyric acid/i.test(title);
  const gabaText = /\bgaba\b|gamma[- ]aminobutyric acid/i.test(text);
  const routeSignals = directRoutePatterns.filter((pattern) => pattern.test(text)).map(String);
  const interventionSignals = interventionPatterns.filter((pattern) => pattern.test(text)).map(String);
  const subjectSignals = subjectPatterns.filter((pattern) => pattern.test(text)).map(String);
  const studySignals = studyPatterns.filter((pattern) => pattern.test(text)).map(String);
  const exclusionSignals = hardExclusionPatterns.filter((pattern) => pattern.test(text)).map(String);
  const productionSignals = productionOnlyPatterns.filter((pattern) => pattern.test(title)).map(String);
  const directTitleSignals = directTitlePatterns.filter((pattern) => pattern.test(title)).map(String);
  const indirectTitleSignals = indirectTitlePatterns.filter((pattern) => pattern.test(title)).map(String);
  const reviewSignal = /\b(?:this|the|our)\s+(?:systematic\s+)?review\b|\bcomprehensive overview\b/i.test(text)
    || /review|meta-analysis|systematic review|editorial|protocol/i.test((record.publicationTypes ?? []).join(" "));
  let score = 0;
  if (gabaTitle) score += 25;
  else if (gabaText) score += 10;
  score += Math.min(35, directTitleSignals.length * 35);
  score += Math.min(30, routeSignals.length * 10);
  score += Math.min(15, interventionSignals.length * 5);
  score += Math.min(15, subjectSignals.length * 5);
  score += Math.min(15, studySignals.length * 3);
  score -= Math.min(55, exclusionSignals.length * 25);
  score -= Math.min(35, productionSignals.length * 15);
  score -= Math.min(55, indirectTitleSignals.length * 30);
  if (reviewSignal) score -= 55;
  score = Math.max(0, Math.min(100, score));
  const hasDirectSignal = gabaText && routeSignals.length > 0 && interventionSignals.length > 0;
  const bucket = score >= 70 && hasDirectSignal && directTitleSignals.length > 0
      && !exclusionSignals.length && !indirectTitleSignals.length && !productionSignals.length && !reviewSignal
    ? "우선검토"
    : score >= 40
      ? "일반검토"
      : "낮은우선순위";
  return {
    score,
    bucket,
    routeSignals,
    interventionSignals,
    subjectSignals,
    studySignals,
    exclusionSignals,
    productionSignals,
    directTitleSignals,
    indirectTitleSignals,
    reviewSignal
  };
}

const existingByPmid = new Map(existing.filter((record) => record.pmid).map((record) => [clean(record.pmid), record]));
const existingByDoi = new Map(existing.filter((record) => record.doi).map((record) => [normalizeDoi(record.doi), record]));
const existingByTitle = new Map(existing.map((record) => [normalizeTitle(record.title), record]));

function findExisting(record) {
  if (record.pmid && existingByPmid.has(clean(record.pmid))) return { type: "PMID", record: existingByPmid.get(clean(record.pmid)), similarity: 1 };
  if (record.doi && existingByDoi.has(normalizeDoi(record.doi))) return { type: "DOI", record: existingByDoi.get(normalizeDoi(record.doi)), similarity: 1 };
  const titleKey = normalizeTitle(record.title);
  if (existingByTitle.has(titleKey)) return { type: "제목일치", record: existingByTitle.get(titleKey), similarity: 1 };
  let best = null;
  for (const existingRecord of existing) {
    if (record.year && existingRecord.year && Math.abs(record.year - existingRecord.year) > 1) continue;
    const similarity = jaccard(record.title, existingRecord.title);
    if (similarity >= 0.88 && (!best || similarity > best.similarity)) {
      best = { type: "유사제목", record: existingRecord, similarity };
    }
  }
  return best;
}

const pubmedSearches = [];
const pubmedOverlapSearches = [];
const sourceErrors = [];
for (const query of PUBMED_QUERIES) {
  try {
    const result = await searchPubMed(query);
    pubmedSearches.push(result);
  } catch (error) {
    sourceErrors.push({ source: `PubMed:${query.label}`, error: String(error?.message || error) });
  }
  await pause(350);
  try {
    const overlapResult = await searchPubMedOverlap(query);
    pubmedOverlapSearches.push(overlapResult);
  } catch (error) {
    sourceErrors.push({ source: `PubMed overlap:${query.label}`, error: String(error?.message || error) });
  }
  await pause(350);
}
const labelsByPmid = new Map();
for (const search of pubmedSearches) {
  for (const pmid of search.ids) {
    if (!labelsByPmid.has(pmid)) labelsByPmid.set(pmid, []);
    labelsByPmid.get(pmid).push(search.label);
  }
}
let pubmedArticles = [];
try {
  pubmedArticles = await fetchPubMedArticles([...labelsByPmid.keys()]);
} catch (error) {
  sourceErrors.push({ source: "PubMed efetch", error: String(error?.message || error) });
}
for (const article of pubmedArticles) article.queryLabels = labelsByPmid.get(article.pmid) ?? [];

const openAlexSearches = [];
for (let index = 0; index < OPENALEX_QUERIES.length; index += 1) {
  try {
    openAlexSearches.push(await searchOpenAlex(OPENALEX_QUERIES[index], index));
  } catch (error) {
    sourceErrors.push({ source: `OpenAlex:${OPENALEX_QUERIES[index]}`, error: String(error?.message || error) });
  }
  await pause(800);
}

const crossrefSearches = [];
for (let index = 0; index < CROSSREF_QUERIES.length; index += 1) {
  try {
    crossrefSearches.push(await searchCrossref(CROSSREF_QUERIES[index], index));
  } catch (error) {
    sourceErrors.push({ source: `Crossref:${CROSSREF_QUERIES[index]}`, error: String(error?.message || error) });
  }
  await pause(350);
}

const mergedRecords = [];
const mergedByDoi = new Map();
const mergedByPmid = new Map();
const mergedByTitle = new Map();
for (const record of [
  ...pubmedArticles,
  ...openAlexSearches.flatMap((search) => search.records),
  ...crossrefSearches.flatMap((search) => search.records)
]) {
  if (!record.title) continue;
  const titleKey = normalizeTitle(record.title);
  const target = (record.doi && mergedByDoi.get(record.doi))
    || (record.pmid && mergedByPmid.get(record.pmid))
    || mergedByTitle.get(titleKey);
  const canonical = target ? mergeRecord(target, record) : record;
  if (!target) mergedRecords.push(canonical);
  if (canonical.doi) mergedByDoi.set(canonical.doi, canonical);
  if (canonical.pmid) mergedByPmid.set(canonical.pmid, canonical);
  if (titleKey) mergedByTitle.set(titleKey, canonical);
}

const reviewed = mergedRecords.map((record) => {
  const quality = scoreRecord(record);
  const existingMatch = findExisting(record);
  return {
    ...record,
    ...quality,
    duplicateStatus: existingMatch ? `기존 ${existingMatch.type}` : "신규 후보",
    existingRecordId: existingMatch?.record?.id || "",
    titleSimilarity: existingMatch ? Number(existingMatch.similarity.toFixed(3)) : 0
  };
});

const hasPublicationFollowup = (record) => record.queryLabels?.includes("publication_followup")
  && (/\bretract(?:ed|ion)?\b|\bexpression of concern\b|\bcorrection\b/i.test(record.title)
    || (record.publicationTypes ?? []).some((type) => /retract|correct/i.test(type)));

const candidates = reviewed
  .filter((record) => !record.existingRecordId && (record.score >= 25 || hasPublicationFollowup(record)))
  .sort((a, b) => {
    const aFollowup = hasPublicationFollowup(a) ? 1 : 0;
    const bFollowup = hasPublicationFollowup(b) ? 1 : 0;
    return bFollowup - aFollowup || b.score - a.score || (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title);
  })
  .slice(0, maxCandidates)
  .map((record, index) => ({
    candidateId: `C-${snapshotDate.replaceAll("-", "")}-${String(index + 1).padStart(4, "0")}`,
    collectedDate: snapshotDate,
    screeningRecommendation: hasPublicationFollowup(record)
      ? "출판 후속조치 우선확인: 철회·정정·우려표명 원문과 원 논문 연결 확인"
      : record.exclusionSignals.length
      ? "경계자료: GABA성 의약품·수용체 연구 또는 비경구/비보충제 가능성 확인"
      : record.indirectTitleSignals.length || record.productionSignals.length
        ? "제외검토: 간접 기전·생산공정·비섭취 연구 여부 확인"
        : record.bucket === "우선검토"
          ? "직접근거 우선검토"
          : "일반 원문검토",
    ...record
  }));

const summary = {
  generatedAt: new Date().toISOString(),
  triageVersion: "2026-09-09.1",
  identifierExtraction: "PubMed primary ArticleIdList only",
  snapshotDate,
  sourceSnapshotDate: database.meta.snapshotDate,
  existingLiterature: existing.length,
  pubmed: {
    queries: pubmedSearches.map(({ label, count, ids }) => ({ label, count, retrieved: ids.length })),
    uniqueRetrieved: labelsByPmid.size,
    overlap: {
      dateType: "PubMed modification date",
      from: overlapStart,
      to: snapshotDate,
      minimumDays: overlapDays,
      queries: pubmedOverlapSearches.map(({ label, count, ids }) => ({ label, count, retrieved: ids.length })),
      uniqueRetrieved: new Set(pubmedOverlapSearches.flatMap((search) => search.ids)).size
    }
  },
  openAlex: {
    queries: openAlexSearches.map(({ label, query, count, records }) => ({ label, query, count, retrieved: records.length })),
    retrieved: openAlexSearches.reduce((sum, search) => sum + search.records.length, 0)
  },
  crossref: {
    queries: crossrefSearches.map(({ label, query, count, records }) => ({ label, query, count, retrieved: records.length })),
    retrieved: crossrefSearches.reduce((sum, search) => sum + search.records.length, 0)
  },
  mergedUnique: mergedRecords.length,
  existingMatches: reviewed.filter((record) => record.existingRecordId).length,
  newCandidates: candidates.length,
  priority: candidates.filter((record) => record.bucket === "우선검토").length,
  general: candidates.filter((record) => record.bucket === "일반검토").length,
  low: candidates.filter((record) => record.bucket === "낮은우선순위").length,
  maxCandidates,
  sourceErrors
};

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(resolve(outputDir, "candidates.json"), `${JSON.stringify({ summary, candidates }, null, 2)}\n`, "utf8"),
  writeFile(resolve(outputDir, "search-summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8")
]);
console.log(JSON.stringify({ outputDir, ...summary }));
