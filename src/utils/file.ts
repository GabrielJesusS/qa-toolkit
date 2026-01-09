function getMimeType(header?: string): string {
  return header?.match(/data:(.*?);base64/)?.[1] ?? "application/octet-stream";
}

export function base64ToFile(
  base64: string,
  fileName: string,
  mimeType?: string
): File {
  const [header, data] = base64.split(",");

  const mime = mimeType ?? getMimeType(header);

  const binary = atob(data);

  const len = binary.length;

  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new File([bytes], fileName, { type: mime });
}
