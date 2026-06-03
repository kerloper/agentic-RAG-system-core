import { QdrantClient } from '@qdrant/js-client-rest';
import config from '../config.js';

// Initialize Qdrant client
const qdrantClient = new QdrantClient({
  url: config.qdrant.url,
});

// Ensure collection exists, create if needed
export async function ensureCollection() {
  try {
    // Check if collection exists
    await qdrantClient.getCollection(config.qdrant.collection);
    console.log(`Collection ready: ${config.qdrant.collection}`);
  } catch (error) {
    // Collection doesn't exist, create it
    if (error.status === 404) {
      await qdrantClient.createCollection(config.qdrant.collection, {
        vectors: {
          size: 768,
          distance: 'Cosine',
        },
      });
      console.log(`Collection created: ${config.qdrant.collection}`);
    } else {
      throw error;
    }
  }
}

export default qdrantClient;
