import { Router } from 'express';
import { deleteUserById, getCurrentUser, getUserById, getUsers, userAuthentication, userRegistration } from './user.controller';
import auth from '../../middleware/checkAuth';
import { roleCheck } from '../../middleware/checkRole';

const router = Router();

router.post('/register', userRegistration);
router.post('/login', userAuthentication);
router.get('/me', auth, getCurrentUser);

router.get('/', getUsers);
router.get('/:id', auth, roleCheck(['admin']), getUserById);
router.delete('/:id', deleteUserById);

export const usersRouter = router;
