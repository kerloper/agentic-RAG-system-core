import { error as logError } from '../../core/utils/logger.js';

export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  logError(`Unhandled error: ${err.message}`);

  res.status(status).json({
    error: 'Internal server error',
    message: err.message || 'An unexpected error occurred',
    status,
  });
}
