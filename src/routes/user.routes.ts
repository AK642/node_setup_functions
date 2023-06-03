import { Router } from 'express';
import { signUp, login, getAuthenticatedUser, logout, authenticateUser, verifyAccount } from '../controllers/user.controller';
import { checkAuthentication } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', checkAuthentication, getAuthenticatedUser);
router.post('/signup', signUp);
router.get('/account-verification', verifyAccount);
router.post('/login', login);
router.post('/authenticate', authenticateUser);
router.get('/logout', logout);

export default router;