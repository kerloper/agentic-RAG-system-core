# Memory

## Key Decisions Made and Why
- Chose paragraph-based chunking because it is simple and predictable.
- Chose cosine distance in Qdrant because it is standard for text embeddings.
- Chose nomic-embed-text because it is lightweight and provides good quality.
- Kept `stream: false` in Ollama for a simpler first version.
- Used ES modules throughout as the modern Node.js standard.

## Known Limitations
- Chunking is naive and has no overlap.
- No score threshold filtering is implemented.
- No conversation history is maintained.

