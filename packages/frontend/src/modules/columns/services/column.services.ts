import {
  IColumnCreate,
  IColumnResponse,
  IColumnUpdate,
  IColumnDelete
} from './../../common/types/column.interface';
import { mainApi, localStorageUserData } from './../../common/services/main.services';

const localStorageData = JSON.parse(localStorageUserData);
const token = localStorageData.token;

export const createColumnFn = async (columnData: IColumnCreate) => {
  const response = await mainApi.post<IColumnResponse>(
    '/column',
    { columnName: columnData },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const getColumnFn = async () => {
  localStorage.removeItem('id');
  const response = await mainApi.get<IColumnResponse>('/column', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateColumnFn = async (columnData: IColumnUpdate) => {
  const response = await mainApi.put<IColumnResponse>(
    `/column/${columnData.columnId}`,
    { columnData: columnData.name },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const deleteColumnFn = async (name: IColumnDelete) => {
  const response = await mainApi.delete<boolean>('/column', {
    data: { columnName: name },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
