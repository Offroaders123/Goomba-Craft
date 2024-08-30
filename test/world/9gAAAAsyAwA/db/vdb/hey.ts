import { readFile, writeFile } from "node:fs/promises";
import { read, stringify } from "nbtify";

const player = await readFile("./slt18.vdb");
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

await writeFile("./player.snbt", snbt);