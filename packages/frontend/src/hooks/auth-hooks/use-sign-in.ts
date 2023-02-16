import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import { useToast } from '@chakra-ui/react';

import { signInFn } from '../../modules/auth/servises/auth.services';
import { LocalStorageActions } from '../../modules/auth/validation/local-storage.actions';
import { ISignInResponse } from '../../modules/common/types/auth.interface';
import { ROUTER_KEYS, SIGN_IN_KEY } from './../../modules/common/constants/app-keys.const';

export const useSignInQuery = () => {
  const history = useHistory();
  const toast = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: signInFn,
    onSuccess: async (data: ISignInResponse) => {
      client.invalidateQueries({ queryKey: SIGN_IN_KEY });
      LocalStorageActions(data as any);
      history.push(ROUTER_KEYS.ROOT);
      setTimeout(() => {
        history.push(ROUTER_KEYS.ROOT);
      }, 500);
    },
    onError: (err) => {
      if (err instanceof Error) {
        console.log(toast);
        toast({
          status: 'error',
          duration: 9000,
          isClosable: true,
          //@ts-ignore
          title: err.response?.data?.message,
          position: 'bottom-left'
        });
      }
    }
  } as ISignInResponse | any);
};
