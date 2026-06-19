import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'List teams (stub)' });
});

router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create team (stub)', body: req.body });
});

export default router;
