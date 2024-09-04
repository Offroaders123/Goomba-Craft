import { decompress } from "nbtify";

export const MAGIC = "abcdef98";

export interface ChunkSection {
  index: number;
  compressedSize: number;
  decompressedSize: number;
}

export interface Chunk {
  index: number;
  byteLength: number;
  data: Uint8Array;
}

export async function readCDB(data: Uint8Array): Promise<(Chunk | null)[]> {
  let byteOffset: number = 0;
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const chunks: (Chunk | null)[] = [];

  const unknown0: number = view.getInt16((byteOffset += 2) - 2, true);
  const unknown1: number = view.getInt16((byteOffset += 2) - 2, true);
  const initFileCount: number = view.getUint32((byteOffset += 4) - 4, true);
  const unknown2: number = view.getUint32((byteOffset += 4) - 4, true);
  const initFileSize: number = view.getUint32((byteOffset += 4) - 4, true);
  const unknown3: number = view.getUint32((byteOffset += 4) - 4, true);

  const files: Uint8Array[] = Array.from({ length: initFileCount })
    .map((_, i) => data.subarray(i * initFileSize, i * initFileSize + initFileSize));

  for (const file of files) {
    let fileByteOffset: number = 0;
    const fileView = new DataView(file.buffer, file.byteOffset, file.byteLength);

    const unknown0: number = fileView.getInt16((fileByteOffset += 2) - 2, true);
    const unknown1: number = fileView.getInt16((fileByteOffset += 2) - 2, true);
    const fileCount: number = fileView.getUint32((fileByteOffset += 4) - 4, true);
    const unknown2: number = fileView.getUint32((fileByteOffset += 4) - 4, true);
    const fileSize: number = fileView.getUint32((fileByteOffset += 4) - 4, true);
    const unknown3: number = fileView.getUint32((fileByteOffset += 4) - 4, true);

    const magic: string = fileView.getUint32((fileByteOffset += 4) - 4, true).toString(16);
    if (magic !== MAGIC) {
      continue; // temp
      throw new Error(`Magic '${magic}' does not match the expected magic '${MAGIC}'`);
    }

    const unknown4: number = fileView.getUint32((fileByteOffset += 4) - 4, true);
    const unknown5: number = fileView.getUint32((fileByteOffset += 4) - 4, true);
    const unknown6: number = fileView.getUint32((fileByteOffset += 4) - 4, true);
    const unknown7: number = fileView.getUint32((fileByteOffset += 4) - 4, true);

    const chunkSections: ChunkSection[] = Array.from({ length: 6 }, () => {
      const index: number = fileView.getInt32((fileByteOffset += 4) - 4, true);
      const compressedSize: number = fileView.getInt32((fileByteOffset += 4) - 4, true);
      const decompressedSize: number = fileView.getInt32((fileByteOffset += 4) - 4, true);
      return { index, compressedSize, decompressedSize };
    });

    for (const { index, compressedSize, decompressedSize } of chunkSections) {
      if (index === -1) chunks.push(null); // return; // fix me pls

      fileByteOffset = index + 20; // index += 20; // is this right?

      const fullChunk: Uint8Array = file.subarray(fileByteOffset, fileByteOffset + initFileSize);
      const chunk: Uint8Array = fullChunk.subarray(0, compressedSize);
      const dcChunk: Uint8Array | null = await decompress(chunk, "deflate").catch(() => null);
      chunks.push({ index, byteLength: decompressedSize, data: dcChunk ?? chunk });
    }
  }

  return chunks;
}