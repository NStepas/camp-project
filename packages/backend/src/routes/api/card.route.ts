import { MAIN_ROUTE, UPDATE_CARD_ROUTE, JWT } from '../../shared/consts/routes.constants';
import { Router } from 'express';
import passport from 'passport';
import CardController from '../../controllers/card.controller';

const router: Router = Router();

router.post(MAIN_ROUTE, passport.authenticate(JWT, { session: false }), CardController.createCard);

router.delete(
  MAIN_ROUTE,
  passport.authenticate(JWT, { session: false }),
  CardController.deleteCard
);

router.put(
  UPDATE_CARD_ROUTE,
  passport.authenticate(JWT, { session: false }),
  CardController.updateCard
);

export default router;
