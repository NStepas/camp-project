import styled from 'styled-components';
import { Button } from '@mui/material';
import { COLORS } from '../../theme';

export const ButtonWrraper = styled(Button)`
  height: '20rem';
  background-color: ${COLORS.indigo};
  display: 'flex';
  flex-direction: 'row-reverse';
  width: '20rem';

  border-radius: '1.5rem';
`;
