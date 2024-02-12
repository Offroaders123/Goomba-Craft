import { readable } from "../node-cdb/dist/index.js";

const db = new readable("./world/9gAAAAsyAwA/db/cdb/index.cdb");
await db.openAsync();

console.log(db);