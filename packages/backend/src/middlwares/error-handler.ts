import { Response } from 'express';

export const errorHandler = async (statusCode: number, message: string, res: Response) => {
  return res.status(statusCode).json({
    statusCode: statusCode,
    message: message
  });
};
