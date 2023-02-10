import { Router, Request, Response } from 'express';
import passport from 'passport';

import UserController from '../../controllers/user.controller';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post('/signUp', UserController.signUp);

router.post('/signIn', UserController.signIn);

router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.send(req.user);
});

export default router;
