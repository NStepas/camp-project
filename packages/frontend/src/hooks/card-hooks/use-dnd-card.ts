import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { dndCardFn } from '../../modules/cards/services/card.services';
import { COLUMN_QUERY_KEY } from '../../modules/common/constants/app-keys.const';
import { IColumnResponse } from '../../modules/common/types/column.interface';

export const useDNDCardQuery = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: dndCardFn,
    onSuccess: async () => {
      window.location.reload();

      client.invalidateQueries({ queryKey: COLUMN_QUERY_KEY }), 500;
    },
    onError: (err) => {
      toast.error(err.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
  } as IColumnResponse | any);
};
