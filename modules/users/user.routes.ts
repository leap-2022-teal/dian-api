import { Router } from 'express';
import { getUser, getUserById, userAuthentication, userRegistration } from './user.controller';
import auth from '../../middleware/checkAuth';

const router = Router();

router.post('/register', userRegistration);
router.post('/login', userAuthentication);

router.get('/', auth, getUser);
router.get('/:id', getUserById);

export const usersRouter = router;
