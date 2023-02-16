import styled from 'styled-components';

import { Container } from '@mui/system';
import { COLORS } from '../../../theme';

export const MainMenu = styled(Container)`
  background-color: ${COLORS.menubar};
  div {
    flex-direction: column;
    display: flex;
    align-items: center;
  }

  img {
    display: flex;
    align-items: center;
  }
  @media (max-width: 600px) {
    padding: 0rem;
    height: auto;
    height: 95vh;
    padding-top: 10rem;
  }
  @media (min-width: 600px) {
    padding: 0rem;
  }
  @media (min-width: 1200px) {
    max-width: 1500px;
  }
`;
