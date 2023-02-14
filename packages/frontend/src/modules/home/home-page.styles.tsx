import styled from 'styled-components';

import { Grid } from '@mui/material';

export const HomeGridWrapper = styled(Grid)`
  margin-top: 1.5rem;
  padding: 0;
  height: 100vh;
  @media (max-width: 900px) {
    height: auto;
    display: flex;
    flex-direction: column-reverse;
  }
`;
