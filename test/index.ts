import { fileURLToPath } from "node:url";
import { Readable } from "constant-db64";

const world: string = fileURLToPath(new URL("./world/9gAAAAsyAwA/db/cdb/index.cdb",import.meta.url));

const db = new Readable(world);
await db.open();

console.log(db);

for await (const key of db.getIterator()){
  console.log(key);
}