import { spawn } from "node:child_process";

const target = process.env.GABA_QA_URL || "https://gaba-evidence-index-kr.dubaissday.chatgpt.site";
const child = spawn(process.execPath, ["scripts/chrome-cdp-qa.mjs"], {
  stdio: "inherit",
  env: { ...process.env, GABA_QA_URL: target }
});

child.once("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});
child.once("exit", (code, signal) => {
  if (signal) {
    console.error(`Live QA terminated by ${signal}`);
    process.exitCode = 1;
  } else {
    process.exitCode = code ?? 1;
  }
});
