import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const teams = await Team.find().populate('members');
  res.json(teams);
});

router.post('/', async (req: Request, res: Response) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

export default router;
