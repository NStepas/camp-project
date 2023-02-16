import React from 'react';
import { useQuery } from 'react-query';

import { useToast } from '@chakra-ui/react';

import { getColumnFn } from '../../modules/columns/services/column.services';
import { COLUMN_QUERY_KEY } from '../../modules/common/constants/app-keys.const';

export const useGetColumnQuery = () => {
  const toast = useToast();
  return useQuery({
    queryFn: () => getColumnFn(),
    queryKey: COLUMN_QUERY_KEY,
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
  });
};
