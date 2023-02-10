import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SIGN_IN_KEY } from '../common/consts/app-keys.const';
import { HomePageContainer } from '../home';

export const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(true);
  return isAuth ? <HomePageContainer /> : <Redirect to={SIGN_IN_KEY} />;
};
{
  /* <NavLink to="/sign-in" /> */
}
