import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SignInContainer } from '../auth/sign-in';
import { SignUpContainer } from '../auth/sign-up';
import { PrivateRoute } from './private-route';
import { ROUTER_KEYS, SIGN_IN_KEY, SIGN_UP_KEY } from '../common/constants/app-keys.const';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path={ROUTER_KEYS.ROOT} component={PrivateRoute} />
      <Route path={SIGN_IN_KEY} component={SignInContainer} />
      <Route path={SIGN_UP_KEY} component={SignUpContainer} />
    </Switch>
  </Router>
);
