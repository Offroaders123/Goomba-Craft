import { fileURLToPath } from "node:url";
import { readable } from "../node-cdb/dist/index.js";

const world: string = fileURLToPath(new URL("./world/9gAAAAsyAwA/db/cdb/index.cdb",import.meta.url));

const db = new readable(world);
await db.openAsync();

console.log(db);

await db.closeAsync();