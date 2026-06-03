export function validateAskRequest(req, res, next) {
  const { question } = req.body;

  if (
    typeof question !== 'string' ||
    question.trim().length === 0 ||
    question.length > 500
  ) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'question is required and must be a non-empty string (max 500 chars)',
    });
  }

  next();
}
