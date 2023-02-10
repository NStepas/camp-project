import styled from 'styled-components';
import { Button } from '@mui/material';
import { COLORS } from '../../theme';

export const ButtonWrraper = styled(Button)`
  background-color: ${COLORS.indigo};
  height: '20rem';
  display: 'flex';
  flex-direction: 'row-reverse';
  width: '20rem' !important;
  borderradius: '1.5rem';
`;
