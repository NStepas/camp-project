import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import ColumnService from '../services/column.service';
import { errorHandler } from '../middlwares/error-handler';
import { COLUMN_ERROR } from '../shared/consts/error.constants';

export class CardController {
  constructor(private readonly columnService: ColumnService) {}

  createColumn = async (req: Request, res: Response) => {
    try {
      const card = await this.columnService.createColumn(req.body);
      if (!card) {
        return errorHandler(StatusCodes.BAD_GATEWAY, COLUMN_ERROR.FAILED_TO_CREATE_COLUMN, res);
      }
      return res.json(card);
    } catch (e) {
      return errorHandler(StatusCodes.BAD_GATEWAY, COLUMN_ERROR.THE_COLUMN_IS_ALREADY_EXIST, res);
    }
  };

  getColumns = async (req: Request, res: Response) => {
    try {
      return res.json(await this.columnService.getAllColumns());
    } catch (e) {
      return errorHandler(StatusCodes.BAD_GATEWAY, COLUMN_ERROR.FAILED_TO_GET_COLUMN, res);
    }
  };

  deleteColumn = async (req: Request, res: Response) => {
    try {
      const isDeleted = await this.columnService.deleteColumn(req.body.columnName);
      if (!isDeleted) {
        return errorHandler(StatusCodes.BAD_GATEWAY, COLUMN_ERROR.FAILED_TO_DELETE_COLUMN, res);
      }
      return res.json(true);
    } catch (e) {
      return errorHandler(StatusCodes.BAD_GATEWAY, COLUMN_ERROR.FAILED_TO_DELETE_COLUMN, res);
    }
  };

  updateColumn = async (req: Request, res: Response) => {
    try {
      return res.json(await this.columnService.updateColumn(req.body, req.params.columnId));
    } catch (e) {
      return errorHandler(StatusCodes.BAD_GATEWAY, COLUMN_ERROR.FAILED_TO_UPDATE_COLUMN, res);
    }
  };
}

const cardController = new CardController(new ColumnService());
export default cardController;
