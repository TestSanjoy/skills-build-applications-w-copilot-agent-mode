import { Router, Request, Response } from 'express';

const router = Router();

// List users
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'List users (stub)' });
});

// Create user
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create user (stub)', body: req.body });
});

export default router;
