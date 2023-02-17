import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './modules/app';

import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { client } from './state/client';

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AppContainer />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
