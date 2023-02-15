import styled from 'styled-components';
import { Button } from '@mui/material';

import { COLORS } from '../../theme/colors.const';

export const ButtonWrraper = styled(Button)`
  background-color: ${COLORS.indigo} !important;
  color: ${COLORS.white} !important;
  display: flex;
  width: max-content;
  flex-direction: row-reverse;
  width: 10rem !important;
  margin-left: 1rem;
  border-radius: 0.5rem;
`;
