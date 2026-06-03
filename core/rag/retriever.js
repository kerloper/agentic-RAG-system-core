import { getEmbedding } from './embedder.js';
import qdrantClient from '../../src/db/qdrantClient.js';
import config from '../../src/config.js';

// Semantic search over ingested knowledge base
export async function retrieve(question) {
  const embedding = await getEmbedding(question);

  const results = await qdrantClient.search(config.qdrant.collection, {
    vector: embedding,
    limit: config.rag.topK,
  });

  return results.map((result) => ({
    text: result.payload.text,
    source: result.payload.source,
    score: result.score,
  }));
}
