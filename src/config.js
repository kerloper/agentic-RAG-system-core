import dotenv from 'dotenv';

dotenv.config();

export default {
  qdrant: {
    url: process.env.QDRANT_URL || 'http://localhost:6333',
    collection: process.env.QDRANT_COLLECTION || 'kerloper-docs',
  },
  ollama: {
    url: process.env.OLLAMA_URL || 'http://localhost:11434',
    model: process.env.OLLAMA_MODEL || 'mistral',
  },
  embedding: {
    model: process.env.EMBED_MODEL || 'nomic-embed-text',
  },
  rag: {
    topK: parseInt(process.env.TOP_K || '5', 10),
  },
};
