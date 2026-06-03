export function buildPrompt(question, chunks) {
  const system = `You are a helpful assistant that answers questions using ONLY the provided context.

IMPORTANT RULES:
- Answer ONLY using the information from the context below
- Do NOT use external knowledge or make up information
- Do NOT give financial advice or predictions
- If the context is insufficient to answer, respond with exactly: "Not found in knowledge base"

Context:`;

  // Format chunks as numbered list
  let contextText = '';
  chunks.forEach((chunk, i) => {
    contextText += `\n${i + 1}. [${chunk.source}]\n${chunk.text}\n`;
  });

  const user = `Based on the context above, answer this question: ${question}`;

  return {
    system: system + contextText,
    user,
  };
}
