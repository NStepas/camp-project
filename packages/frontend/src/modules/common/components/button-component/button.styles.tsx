import styled from 'styled-components';
import { Button } from '@mui/material';
import { COLORS } from '../../../theme';

export const ButtonWrraper = styled(Button)`
  background-color: ${COLORS.indigo};
  display: flex;
  height: 2.5rem;
  flex-direction: row-reverse;
  width: 10rem !important;
  border-radius: 1rem;
`;
