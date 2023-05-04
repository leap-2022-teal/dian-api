import { Router } from 'express';
import { getUser, getUserById, userAuthentication, userRegistration } from './user.controller';

const router = Router();

router.post('/register', userRegistration);
router.post('/login', userAuthentication);

router.get('/', getUser);
router.get('/:id', getUserById);

export const usersRouter = router;
