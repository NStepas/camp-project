import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import ColumnService from '../services/column.service';
import { errorHandler } from '../middlwares/error-handler';
import { COLUMN_ERROR } from '../shared/consts/error.constants';

export class CardController {
  constructor(private readonly columnService: ColumnService) {}

  createColumn = async (req: Request, res: Response) => {
    try {
      const getColumns = await this.columnService.getAllColumnsWithoutPopulate();
      const column = await this.columnService.createColumn(req.body, getColumns);
      if (!column) {
        return errorHandler(StatusCodes.BAD_GATEWAY, COLUMN_ERROR.FAILED_TO_CREATE_COLUMN, res);
      }
      return res.json(column);
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

  updateColumnOrder = async (req: Request, res: Response) => {
    try {
      const getColumnByOldIndex = await this.columnService.getColumnByIndexAndUpdate(req.body);
      if (!getColumnByOldIndex) {
        return errorHandler(StatusCodes.BAD_REQUEST, COLUMN_ERROR.FAILED_TO_GET_COLUMN_COUNT, res);
      }
      return res.json(await this.columnService.updateColumnOrder(req.body));
    } catch (e) {
      return errorHandler(
        StatusCodes.SERVICE_UNAVAILABLE,
        COLUMN_ERROR.FAILED_TO_UPDATE_COLUMN_ORDER,
        res
      );
    }
  };
}

const cardController = new CardController(new ColumnService());
export default cardController;
