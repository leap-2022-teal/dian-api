import { Router } from 'express';
import { userRegistration } from './user.controller';

const router = Router();

router.post('/register', userRegistration);

export const usersRouter = router;
