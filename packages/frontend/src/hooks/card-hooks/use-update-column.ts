import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { COLUMN_QUERY_KEY } from '../../modules/common/constants/app-keys.const';
import { updateCardFn } from '../../modules/cards/services/card.services';
import { ICardResponse } from '../../modules/common/types/card.interfaces';

export const useUpdateCardQuery = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateCardFn,
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
