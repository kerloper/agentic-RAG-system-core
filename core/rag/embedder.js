import fetch from 'node-fetch';
import config from '../../src/config.js';

// Get embedding for text from Ollama
export async function getEmbedding(text) {
  try {
    const response = await fetch(`${config.ollama.url}/api/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.embedding.model,
        prompt: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.embedding;
  } catch (error) {
    throw new Error(
      `Failed to get embedding from Ollama at ${config.ollama.url}: ${error.message}`
    );
  }
}
