import express from 'express';
import cors from 'cors';
import config from './config.js';
import { ensureCollection } from './db/qdrantClient.js';
import { log, error as logError } from '../core/utils/logger.js';
import { requestLogger } from './middleware/requestLogger.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;
let server;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

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

// Global error handler
app.use(errorHandler);

function startServer() {
  server = app.listen(PORT, () => {
    log(`Kerloper RAG API running on port ${PORT}`);
  });
}

function handleShutdown() {
  log('Shutting down gracefully...');
  if (server) {
    server.close(() => {
      log('Server closed');
      process.exit(0);
    });

    setTimeout(() => {
      logError('Force shutting down after timeout');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
}

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

ensureCollection()
  .then(() => {
    startServer();
  })
  .catch((initError) => {
    logError(`Failed to initialize Qdrant collection: ${initError.message}`);
    log('Starting server anyway...');
    startServer();
  });
