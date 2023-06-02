import { Router } from 'express';
import userRoutes from './user.routes';
import volunteerRoutes from './volunteer-profile.routes';
import { checkAuthentication } from '../middlewares/auth.middleware';


const router = Router();

router.use('/user', userRoutes);
router.use('/volunteer', checkAuthentication, volunteerRoutes);

export default router;