import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { errorHandler } from '../middlwares/error-handler';
import { CARD_ERROR } from '../shared/consts/error.constants';
import CardService from '../services/card.service';

export class CardController {
  constructor(private readonly cardService: CardService) {}

  createCard = async (req: Request, res: Response) => {
    try {
      const card = await this.cardService.createCard(req.body);
      if (!card) {
        return errorHandler(StatusCodes.BAD_GATEWAY, CARD_ERROR.FAILED_TO_CREATE_CARD, res);
      }

      return res.json(card);
    } catch (e) {
      return errorHandler(StatusCodes.BAD_GATEWAY, CARD_ERROR.THE_CARD_IS_ALREADY_EXIST, res);
    }
  };

  deleteCard = async (req: Request, res: Response) => {
    try {
      const isDeleted = await this.cardService.deleteCard(req.body.cardName);
      if (!isDeleted) {
        return errorHandler(StatusCodes.BAD_GATEWAY, CARD_ERROR.FAILED_TO_DELETE_CARD, res);
      }
      return res.json(true);
    } catch (e) {
      return errorHandler(StatusCodes.BAD_GATEWAY, CARD_ERROR.FAILED_TO_DELETE_CARD, res);
    }
  };

  updateCard = async (req: Request, res: Response) => {
    try {
      return res.json(await this.cardService.updateCard(req.body, req.params.cardId));
    } catch (e) {
      return errorHandler(StatusCodes.BAD_GATEWAY, CARD_ERROR.FAILED_TO_UPDATE_CARD, res);
    }
  };
}

const cardController = new CardController(new CardService());
export default cardController;
