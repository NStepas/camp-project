import {
  MAIN_ROUTE,
  UPDATE_CARD_ROUTE,
  JWT,
  UPDATE_CARD_COLUMN_ID_ROUTE
} from '../../shared/consts/routes.constants';
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

router.patch(
  UPDATE_CARD_COLUMN_ID_ROUTE,
  passport.authenticate(JWT, { session: false }),
  CardController.updateCardColumnId
);

export default router;
