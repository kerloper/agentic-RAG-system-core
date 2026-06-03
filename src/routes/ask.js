import { Router } from 'express';
import { handleQuery } from '../services/ragService.js';
import { validateAskRequest } from '../middleware/validateRequest.js';

const router = Router();

router.post('/ask', validateAskRequest, async (req, res, next) => {
  try {
    const { question } = req.body;
    const result = await handleQuery(question);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
