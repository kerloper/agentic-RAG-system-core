import { retrieve } from '../../core/rag/retriever.js';
import { buildPrompt } from '../../core/llm/promptBuilder.js';
import { generateAnswer } from '../../core/llm/ollama.js';
import { log } from '../../core/utils/logger.js';

export async function handleQuery(question) {
  log(`Processing query: ${question}`);

  // Step 1: Retrieve relevant chunks
  log('Retrieving relevant documents...');
  const chunks = await retrieve(question);

  // Step 2: Build prompt
  log('Building RAG prompt...');
  const prompt = buildPrompt(question, chunks);

  // Step 3: Generate answer
  log('Generating answer...');
  const answer = await generateAnswer(prompt);

  // Step 4: Extract unique sources
  const uniqueSources = [...new Set(chunks.map((c) => c.source))];

  log(`Query complete. Sources: ${uniqueSources.join(', ')}`);

  return {
    answer,
    sources: uniqueSources,
  };
}
