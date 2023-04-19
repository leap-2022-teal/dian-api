import { Router } from 'express';
import { userRegister } from './user.controller';

const router = Router();

router.post('/register', userRegister);

export const usersRouter = router;
