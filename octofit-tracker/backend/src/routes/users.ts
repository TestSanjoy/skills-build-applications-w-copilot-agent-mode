import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// List users
router.get('/', async (req: Request, res: Response) => {
  const users = await User.find().populate('team');
  res.json(users);
});

// Create user
router.post('/', async (req: Request, res: Response) => {
  const data = req.body;
  const user = new User(data);
  await user.save();
  res.status(201).json(user);
});

export default router;
