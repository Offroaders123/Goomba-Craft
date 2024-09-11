import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { read, stringify, type RootTag } from "nbtify";
import { type Chunk, readCDB, readVDB } from "../src/index.js";
import { type Chunk as Chunk2, readCDB as readCDB2 } from "../lib3DSE/src/index.js";

const world: string = fileURLToPath(new URL("./world/9gAAAAsyAwA", import.meta.url));

await readCDBS(world);
// await readVDBS(world);

async function readCDBS(path: string): Promise<void> {
  const cdbs: DirFile[] = await readDirFiles(join(path, "db/cdb"), "slt");
  // console.log(cdbs.map(([ name ]) => name), "\n");

  const cdbdatas: [string, RootTag[]][] = await Promise.all(
    cdbs.map(async ([ name, data ]) => {
      const result: Chunk2[] = await readCDB2(data).catch(() => []);
      const filtered: RootTag[] = (await Promise.all(result
        .map(data => data.data)
        .map(data => read(data, {
          rootName: true,
          endian: "little",
          compression: null,
          bedrockLevel: false
        }).catch(() => null))))
        .filter(data => data !== null)
        .map(data => data.data);
      return [name, filtered];
    })
  );

  for (const cdbdata of cdbdatas) {
    console.log(cdbdata, "\n");
  }

  // console.log(stringify(Object.fromEntries(cdbdatas), { space: 2 }));
}

async function readVDBS(path: string): Promise<void> {
  const vdbs: DirFile[] = await readDirFiles(join(path, "db/vdb"), "slt");
  console.log(vdbs.map(([ name ]) => name), "\n");

  const vnbts: [string, RootTag][] = await Promise.all(
    vdbs.map(async ([ name, data ]) => [name, (await readVDB(data)).data])
  );

  for (const vnbt of vnbts) {
    console.log(...vnbt, "\n");
  }
}

type DirFile = [string, Buffer];

async function readDirFiles(path: string, filter: string): Promise<DirFile[]> {
  return await Promise.all(
    (await readdir(join(path), { withFileTypes: true }))
      .filter(entry => entry.name.includes(filter))
      .map(async entry => [entry.name, await readFile(join(entry.parentPath, entry.name))])
  );
}