import { randomUUID } from 'crypto';

// Simple paragraph-based chunking
export function chunkText(text, filename) {
  // Split by double newline
  const paragraphs = text.split('\n\n');

  // Filter and map to chunk objects
  const chunks = paragraphs
    .filter((para) => para.trim().length >= 50)
    .map((para) => ({
      id: randomUUID(),
      text: para.trim(),
      source: filename,
    }));

  return chunks;
}
