import styled from 'styled-components';

import { Grid } from '@mui/material';
import { Container } from '@mui/system';

export const HomeGridWrapper = styled(Grid)`
  margin-top: 1.5rem;
  padding: 0;
  @media (max-width: 900px) {
    height: auto;
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const MainContainer = styled(Container)`
  height: 100vh;
  @media (max-width: 600px) {
    padding: 0rem;
    height: auto;
  }
  @media (min-width: 600px) {
    padding: 0rem;
  }
  @media (min-width: 1200px) {
    max-width: 1500px;
  }
`;
