import { Router } from 'express';
import { getCurrentUser, getUserById, getUsers, userAuthentication, userRegistration } from './user.controller';
import auth from '../../middleware/checkAuth';

const router = Router();

router.post('/register', userRegistration);
router.post('/login', userAuthentication);
router.get('/me', auth, getCurrentUser);

router.get('/', getUsers);
router.get('/:id', getUserById);

export const usersRouter = router;
