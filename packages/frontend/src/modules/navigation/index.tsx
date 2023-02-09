import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import { SignInContainer } from '../auth/sign-in';
import { SignUpContainer } from '../auth/sign-up';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path={APP_KEYS.ROUTER_KEYS.ROOT} component={HomePageContainer} />
      {/* <Route path="*" element={<HomePageContainer />} /> */}
      {/* <Route path={APP_KEYS.ROUTER_KEYS.ROOT} component={<HomePageContainer />} /> */}
      <Route path={APP_KEYS.SIGN_IN_KEYS.ROOT} component={SignInContainer} />
      <Route path={APP_KEYS.SIGN_UP_KEYS.ROOT} component={SignUpContainer} />
    </Switch>
  </Router>
);
