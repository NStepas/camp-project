import React from 'react';
import { STORAGE_KEYS } from '../../common/constants/app-keys.const';

interface ILocalStorageActions {
  name: string;
  jwtToken: string;
}

export function LocalStorageActions({ name, jwtToken }: ILocalStorageActions) {
  localStorage.setItem(
    STORAGE_KEYS.USER_ADDRESS,
    JSON.stringify({
      name: name,
      token: jwtToken
    })
  );
}
