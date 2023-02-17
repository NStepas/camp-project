import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { deleteCardFn } from '../../modules/cards/services/card.services';
import { COLUMN_QUERY_KEY } from '../../modules/common/constants/app-keys.const';
import { ICardResponse } from '../../modules/common/types/card.interfaces';

export const useDeleteCardQuery = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteCardFn,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: COLUMN_QUERY_KEY });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
  } as ICardResponse | any);
};
