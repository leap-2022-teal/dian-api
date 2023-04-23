import { Router } from 'express';
import { userAuthentication, userRegistration } from './user.controller';

const router = Router();

router.post('/register', userRegistration);
router.post('/login', userAuthentication);

export const usersRouter = router;
