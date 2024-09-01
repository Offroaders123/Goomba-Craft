import { read, type NBTData } from "nbtify";

export async function readVDB(data: Uint8Array): Promise<NBTData> {
  let byteOffset: number = 0x23;
  while (true) {
    try {
      return await read(data.subarray(byteOffset++), {
        rootName: true,
        endian: "little",
        compression: null,
        bedrockLevel: false,
        strict: false
      });
    } catch {}
  }
}