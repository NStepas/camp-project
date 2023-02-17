import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { getColumnFn } from '../../modules/columns/services/column.services';
import { COLUMN_QUERY_KEY } from '../../modules/common/constants/app-keys.const';

export const useGetColumnQuery = () => {
  return useQuery({
    queryFn: () => getColumnFn(),
    queryKey: COLUMN_QUERY_KEY,
    onError: (err: any) => {
      toast.error(err.response?.data?.message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
  });
};
