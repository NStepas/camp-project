import { useMutation, useQueryClient } from 'react-query';

import { useToast } from '@chakra-ui/react';

import { deleteColumnFn } from '../../modules/columns/services/column.services';
import { COLUMN_QUERY_KEY } from '../../modules/common/constants/app-keys.const';
import { IColumnResponse } from '../../modules/common/types/column.interface';

export const useDeleteColumnQuery = () => {
  const client = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: deleteColumnFn,
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
  } as IColumnResponse | any);
};
