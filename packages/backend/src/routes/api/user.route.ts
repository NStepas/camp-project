import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '../../shared/consts/routes.constants';
import { Router } from 'express';

import UserController from '../../controllers/user.controller';

const router: Router = Router();

router.post(SIGN_UP_ROUTE, UserController.signUp);

router.post(SIGN_IN_ROUTE, UserController.signIn);

export default router;
