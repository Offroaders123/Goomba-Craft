import { read, type NBTData } from "nbtify";

export async function readVDB(data: Uint8Array): Promise<NBTData> {
  return await read(data.subarray(0x35), {
    rootName: true,
    endian: "little",
    compression: null,
    bedrockLevel: false,
    strict: false
  });
}