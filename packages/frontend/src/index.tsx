import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './modules/app';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import 'overlayscrollbars/overlayscrollbars.css';

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      {/* <ChakraProvider> */}
      <AppContainer />
      {/* </ChakraProvider> */}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
