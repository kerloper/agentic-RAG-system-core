import { log } from '../../core/utils/logger.js';

export function requestLogger(req, res, next) {
  log(`${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
}
