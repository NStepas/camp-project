import {
  IColumnCreate,
  IColumnResponse,
  IColumnUpdate,
  IColumnDelete
} from './../../common/types/column.interface';
import { mainApi } from './../../common/services/main.services';

export const createColumnFn = async (columnData: IColumnCreate) => {
  const response = await mainApi.post<IColumnResponse>('/column', columnData);
  return response.data;
};
export const getColumnFn = async (token: string) => {
  console.log(token);

  const response = await mainApi.get<IColumnResponse>('/column', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
export const updateColumnFn = async (columnData: IColumnUpdate) => {
  console.log(columnData);
  const response = await mainApi.put<IColumnResponse>('/column/:columnId', { columnData });

  return response.data;
};

export const deleteColumnFn = async (name: IColumnDelete) => {
  const response = await mainApi.delete<boolean>('/column', { data: name });
  return response.data;
};
