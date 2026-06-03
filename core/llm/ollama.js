import fetch from 'node-fetch';
import config from '../../src/config.js';
import { error as logError } from '../../core/utils/logger.js';

export async function generateAnswer(prompt) {
  try {
    const response = await fetch(`${config.ollama.url}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.ollama.model,
        messages: [
          { role: 'system', content: prompt.system },
          { role: 'user', content: prompt.user },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.message.content;
  } catch (err) {
    logError(`Failed to generate answer: ${err.message}`);
    throw err;
  }
}
