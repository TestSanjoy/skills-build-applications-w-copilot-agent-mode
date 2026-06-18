import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const items = await Leaderboard.find().sort({ score: -1 }).limit(50);
  res.json(items);
});

export default router;
