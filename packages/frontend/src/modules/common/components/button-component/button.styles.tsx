import styled from 'styled-components';
import { Button } from '@mui/material';

import { COLORS } from '../../../theme';

export const ButtonWrraper = styled(Button)`
  background-color: ${COLORS.main} !important;
  color: ${COLORS.white} !important;
  display: flex;
  width: max-content;
  flex-direction: row-reverse;
  width: 10rem !important;
  margin-right: 1rem;
`;
