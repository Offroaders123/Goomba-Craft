import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { RootTag } from "nbtify";
import { readVDB } from "../src/index.js";

const vdbs: [string, Buffer][] = await Promise.all(
  (await readdir(new URL("./world/9gAAAAsyAwA/db/vdb", import.meta.url), { withFileTypes: true }))
    .filter(entry => entry.name.includes("slt"))
    .map(async entry => [entry.name, await readFile(join(entry.parentPath, entry.name))])
);
console.log(vdbs.map(([ name ]) => name), "\n");

const vnbts: [string, RootTag][] = await Promise.all(
  vdbs.map(async ([ name, data ]) => [name, (await readVDB(data)).data])
);

for (const vnbt of vnbts) {
  console.log(...vnbt, "\n");
}