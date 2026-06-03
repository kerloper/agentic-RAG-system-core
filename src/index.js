import express from 'express';
import config from './config.js';

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

// Start server
app.listen(PORT, () => {
  console.log(`Kerloper RAG API running on port ${PORT}`);
});
