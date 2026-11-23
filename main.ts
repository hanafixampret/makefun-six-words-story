import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "Buried him Tuesday. Wednesday, she danced.";

const words = STORY.trim().split(/\s+/);
if (words.length !== 6) {
  throw new Error(`story must be exactly six words, got ${words.length}`);
}
if (STORY.length < 1 || STORY.length > 60) {
  throw new Error(`story must be 1-60 characters, got ${STORY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, STORY, "utf8");
if (readFileSync(outPath, "utf8") !== STORY) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(STORY);
