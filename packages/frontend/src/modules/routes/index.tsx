import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { APP_KEYS } from '../common/constants';
import { SignInContainer } from '../auth/sign-in';
import { SignUpContainer } from '../auth/sign-up';
import { PrivateRoute } from './privateRoute';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path={APP_KEYS.ROUTER_KEYS.ROOT} component={PrivateRoute} />
      <Route path={APP_KEYS.SIGN_IN_KEY} component={SignInContainer} />
      <Route path={APP_KEYS.SIGN_UP_KEY} component={SignUpContainer} />
    </Switch>
  </Router>
);
