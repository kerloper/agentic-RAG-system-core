import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import qdrantClient from '../../src/db/qdrantClient.js';
import { getEmbedding } from './embedder.js';
import { chunkText } from './chunker.js';
import { log, error, success } from '../utils/logger.js';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const DOCS_PATH = join(__dirname, '../../docs');

async function ingestionPipeline() {
  try {
    // Read all markdown files from /docs
    const files = await readdir(DOCS_PATH);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    if (mdFiles.length === 0) {
      log('No markdown files found in /docs');
      return;
    }

    for (const filename of mdFiles) {
      log(`Ingesting: ${filename}`);
      const filepath = join(DOCS_PATH, filename);

      try {
        // Read file content
        const content = await readFile(filepath, 'utf-8');

        // Chunk the content
        const chunks = chunkText(content, filename);

        if (chunks.length === 0) {
          log(`No chunks created from ${filename} (all chunks too small)`);
          continue;
        }

        // Prepare points for Qdrant
        const points = [];
        for (const chunk of chunks) {
          const embedding = await getEmbedding(chunk.text);
          points.push({
            id: chunk.id,
            vector: embedding,
            payload: {
              text: chunk.text,
              source: chunk.source,
            },
          });
        }

        // Batch upsert to Qdrant
        await qdrantClient.upsert('kerloper-docs', {
          points,
        });

        success(`Ingested ${chunks.length} chunks from ${filename}`);
      } catch (fileError) {
        error(`Failed to ingest ${filename}: ${fileError.message}`);
      }
    }

    success('Ingestion complete');
  } catch (err) {
    error(`Ingestion pipeline failed: ${err.message}`);
    process.exit(1);
  }
}

// Run ingestion pipeline
ingestionPipeline();
