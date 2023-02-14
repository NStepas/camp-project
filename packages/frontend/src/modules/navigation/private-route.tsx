import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { HomePageContainer } from '../home';

import { SIGN_IN_KEY } from '../common/constants/app-keys.const';
import { localStorageUserData } from '../common/services/main.services';

export const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(false);

  const onMount = async () => {
    const localStorageData = JSON.parse(localStorageUserData);
    if (localStorageData.token) {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  return { isAuth } ? <HomePageContainer /> : <NavLink to={SIGN_IN_KEY} />;
};
