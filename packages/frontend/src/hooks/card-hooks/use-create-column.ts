import { useMutation, useQueryClient } from 'react-query';

import { useToast } from '@chakra-ui/react';

import { COLUMN_QUERY_KEY } from '../../modules/common/constants/app-keys.const';
import { createCardFn } from '../../modules/cards/services/card.services';
import { ICardResponse } from '../../modules/common/types/card.interfaces';

export const useCreateCardQuery = () => {
  const toast = useToast();
  const client = useQueryClient();
  return useMutation({
    mutationFn: createCardFn,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: COLUMN_QUERY_KEY });
    },
    onError: (err) => {
      if (err instanceof Error) {
        console.log(toast);
        toast({
          status: 'error',
          //@ts-ignore
          title: err.response?.data?.message,
          position: 'top-right'
        });
      }
    }
  } as ICardResponse | any);
};
