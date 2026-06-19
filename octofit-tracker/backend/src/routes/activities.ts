import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'List activities (stub)' });
});

router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create activity (stub)', body: req.body });
});

export default router;
