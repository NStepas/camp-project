import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { COLUMN_QUERY_KEY } from '../../modules/common/constants/app-keys.const';
import { IColumnResponse } from '../../modules/common/types/column.interface';
import { dndColumnFn } from '../../modules/columns/services/column.services';

export const useDNDColumnQuery = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: dndColumnFn,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: COLUMN_QUERY_KEY }), 500;
    },
    onError: (err) => {
      toast.error(err.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
  } as IColumnResponse | any);
};
