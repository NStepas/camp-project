import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SIGN_IN_KEY } from '../common/constants/app-keys.const';
import { HomePageContainer } from '../home';

export const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(false);

  const onMount = async () => {
    const localStorageData = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorageData.token) {
      setIsAuth(true);
    }
    console.log(localStorageData.token);
  };
  useEffect(() => {
    onMount();
  }, []);

  return { isAuth } ? <HomePageContainer /> : <Redirect to={SIGN_IN_KEY} />;
};
