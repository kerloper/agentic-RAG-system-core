import express from 'express';
import config from './config.js';
import { ensureCollection } from './db/qdrantClient.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    model: config.ollama.model,
  });
});

// API routes
import askRoutes from './routes/ask.js';
app.use('/api', askRoutes);

// Initialize Qdrant collection before starting server
ensureCollection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Kerloper RAG API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize Qdrant collection:', error.message);
    console.log('Starting server anyway...');
    app.listen(PORT, () => {
      console.log(`Kerloper RAG API running on port ${PORT}`);
    });
  });
