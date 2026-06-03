import { Router } from 'express';
import { handleQuery } from '../services/ragService.js';

const router = Router();

router.post('/ask', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({
      error: 'Missing required field: question',
    });
  }

  try {
    const result = await handleQuery(question);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to process query',
      message: error.message,
    });
  }
});

export default router;
