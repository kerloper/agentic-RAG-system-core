import { Router } from 'express';

const router = Router();

// TODO: connect to RAG pipeline
router.post('/ask', (req, res) => {
  res.json({
    answer: 'RAG pipeline not yet connected',
    sources: [],
  });
});

export default router;
