import { Router } from 'express';
import { signUp, login, getAuthenticatedUser, logout } from '../controllers/user.controller';

const router = Router();

router.get('/', getAuthenticatedUser);
router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logout);

export default router;