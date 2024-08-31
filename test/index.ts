import { readFile, writeFile } from "node:fs/promises";
import { read, stringify } from "nbtify";

const player = await readFile(new URL("./world/9gAAAAsyAwA/db/vdb/slt18.vdb", import.meta.url));
console.log(player);

const nbt = await read(player.subarray(0x35), {
  rootName: true,
  endian: "little",
  compression: null,
  bedrockLevel: false,
  strict: false
});
console.log(nbt);

const snbt = stringify(nbt, { space: 2 });

// await writeFile("./player.snbt", snbt);