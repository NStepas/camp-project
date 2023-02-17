import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { deleteColumnFn } from '../../modules/columns/services/column.services';
import { COLUMN_QUERY_KEY } from '../../modules/common/constants/app-keys.const';
import { IColumnResponse } from '../../modules/common/types/column.interface';

export const useDeleteColumnQuery = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteColumnFn,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: COLUMN_QUERY_KEY });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
  } as IColumnResponse | any);
};
