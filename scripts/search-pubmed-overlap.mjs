import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const siteRoot = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const gabaRoot = resolve(siteRoot, "..");
const formatKstDate = (date) => new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(date);
const today = formatKstDate(new Date());
const sinceArg = process.argv.find((value) => value.startsWith("--since="));
const since = sinceArg?.split("=")[1]
  || formatKstDate(new Date(Date.now() - 60 * 86400000));
const outputArg = process.argv.find((value) => value.startsWith("--out="));
const outputPath = outputArg
  ? resolve(outputArg.slice("--out=".length))
  : resolve(gabaRoot, "outputs", `literature-search-${today}`, "pubmed-overlap.json");

const queries = [
  ["human_direct", `(\"gamma-aminobutyric acid\"[Title/Abstract] OR GABA[Title]) AND (oral[Title/Abstract] OR orally[Title/Abstract] OR ingestion[Title/Abstract] OR intake[Title/Abstract] OR supplement*[Title/Abstract] OR beverage[Title/Abstract] OR drink*[Title/Abstract] OR food[Title/Abstract] OR consumption[Title/Abstract]) AND (humans[MeSH Terms] OR clinical trial[Publication Type] OR randomized controlled trial[Publication Type]) NOT (review[Publication Type] OR meta-analysis[Publication Type] OR systematic review[Publication Type])`],
  ["animal_direct", `(\"gamma-aminobutyric acid\"[Title/Abstract] OR GABA[Title]) AND (oral[Title/Abstract] OR orally[Title/Abstract] OR gavage[Title/Abstract] OR diet*[Title/Abstract] OR feed[Title/Abstract] OR fed[Title/Abstract] OR feeding[Title/Abstract] OR \"drinking water\"[Title/Abstract] OR supplementation[Title/Abstract] OR supplemented[Title/Abstract]) AND animals[MeSH Terms] NOT (review[Publication Type] OR meta-analysis[Publication Type] OR systematic review[Publication Type])`],
  ["livestock_aquaculture", `(\"gamma-aminobutyric acid\"[Title/Abstract] OR GABA[Title]) AND (broiler[Title/Abstract] OR poultry[Title/Abstract] OR chicken[Title/Abstract] OR \"laying hen\"[Title/Abstract] OR pig[Title/Abstract] OR swine[Title/Abstract] OR cattle[Title/Abstract] OR cow[Title/Abstract] OR goat[Title/Abstract] OR sheep[Title/Abstract] OR rabbit[Title/Abstract] OR fish[Title/Abstract] OR shrimp[Title/Abstract] OR aquaculture[Title/Abstract]) AND (diet*[Title/Abstract] OR feed[Title/Abstract] OR fed[Title/Abstract] OR feeding[Title/Abstract] OR supplementation[Title/Abstract] OR \"drinking water\"[Title/Abstract]) NOT review[Publication Type]`],
  ["food_matrix", `(\"GABA-enriched\"[Title/Abstract] OR \"GABA enriched\"[Title/Abstract] OR \"GABA-rich\"[Title/Abstract] OR \"GABA rich\"[Title/Abstract] OR \"gamma-aminobutyric acid-enriched\"[Title/Abstract]) AND (trial[Title/Abstract] OR participants[Title/Abstract] OR subjects[Title/Abstract] OR rats[Title/Abstract] OR mice[Title/Abstract] OR animals[MeSH Terms] OR humans[MeSH Terms]) NOT review[Publication Type]`],
  ["safety_toxicology", `(\"gamma-aminobutyric acid\"[Title/Abstract] OR GABA[Title]) AND (safety[Title/Abstract] OR toxic*[Title/Abstract] OR tolerability[Title/Abstract] OR adverse[Title/Abstract] OR NOAEL[Title/Abstract]) AND (oral[Title/Abstract] OR gavage[Title/Abstract] OR diet*[Title/Abstract] OR intake[Title/Abstract] OR supplementation[Title/Abstract]) NOT review[Publication Type]`],
  ["human_combination_exercise_product", `(\"gamma-aminobutyric acid\"[Title/Abstract] OR GABA[Title]) AND (exercise[Title/Abstract] OR training[Title/Abstract] OR caffeine[Title/Abstract] OR theanine[Title/Abstract] OR probiotic*[Title/Abstract] OR fermented[Title/Abstract] OR skin[Title/Abstract]) AND (oral[Title/Abstract] OR intake[Title/Abstract] OR supplement*[Title/Abstract] OR ingestion[Title/Abstract] OR administration[Title/Abstract]) AND (humans[MeSH Terms] OR clinical trial[Publication Type] OR randomized controlled trial[Publication Type]) NOT (review[Publication Type] OR meta-analysis[Publication Type] OR systematic review[Publication Type])`],
  ["recent_2024_plus", `(\"gamma-aminobutyric acid\"[Title/Abstract] OR GABA[Title]) AND (oral[Title/Abstract] OR intake[Title/Abstract] OR supplement*[Title/Abstract] OR gavage[Title/Abstract] OR diet*[Title/Abstract] OR feed[Title/Abstract] OR \"drinking water\"[Title/Abstract] OR beverage[Title/Abstract]) AND (\"2024/01/01\"[Date - Publication] : \"3000\"[Date - Publication]) NOT review[Publication Type]`]
];

const wait = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
async function getJson(url) {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "User-Agent": "GABA-evidence-index/2.0 weekly overlap audit" } });
      if (response.ok) return await response.json();
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
    await wait(800 * attempt);
  }
  throw lastError;
}

const results = [];
for (const [label, term] of queries) {
  const params = new URLSearchParams({
    db: "pubmed",
    term,
    retmode: "json",
    retmax: "10000",
    datetype: "mdat",
    mindate: since.replaceAll("-", "/"),
    maxdate: today.replaceAll("-", "/"),
    sort: "pub date"
  });
  const data = await getJson(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?${params}`);
  results.push({ label, count: Number(data.esearchresult?.count || 0), ids: data.esearchresult?.idlist || [] });
  await wait(400);
}

const uniqueIds = [...new Set(results.flatMap((result) => result.ids))];
const payload = {
  generatedAt: new Date().toISOString(),
  dateType: "PubMed modification date",
  from: since,
  to: today,
  minimumOverlapDays: 60,
  queries: results.map(({ label, count, ids }) => ({ label, count, retrieved: ids.length })),
  uniqueRetrieved: uniqueIds.length,
  ids: uniqueIds
};
await mkdir(resolve(outputPath, ".."), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, ...payload, ids: undefined }));
