import { readFile } from "node:fs/promises";
import { readVDB } from "../src/index.js";

const vdb = await readFile(new URL("./world/9gAAAAsyAwA/db/vdb/slt18.vdb", import.meta.url));
console.log(vdb);

const player = await readVDB(vdb);
console.log(player);