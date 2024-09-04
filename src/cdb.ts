export interface Entry {
  index: number;
  compressedSize: number;
  decompressedSize: number;
}

export interface Chunk {
  index: number;
  byteLength: number;
  data: Uint8Array;
}

export function readCDB(data: Uint8Array): Chunk[] {
  let byteOffset: number = 0;
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const chunks: Chunk[] = [];

  const unknown0: number = view.getInt16((byteOffset += 2) - 2, true);
  const unknown1: number = view.getInt16((byteOffset += 2) - 2, true);
  const initFileCount: number = view.getUint32((byteOffset += 4) - 4, true);
  const unknown2: number = view.getUint32((byteOffset += 4) - 4, true);
  const initFileSize: number = view.getUint32((byteOffset += 4) - 4, true);
  const unknown3: number = view.getUint32((byteOffset += 4) - 4, true);

  const files: Uint8Array[] = Array.from({ length: initFileCount })
    .map((_, i) => data.subarray(i * initFileSize, i * initFileSize + initFileSize));

  return files;
}