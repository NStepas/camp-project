import styled from 'styled-components';
import { TextField } from '@mui/material';
import { COLORS } from '../../../theme';

export const CardTextFieldWrapper = styled(TextField)`
  overflow-y: 'scroll';
  border: '1px solid red';
  width: '500px';
  float: 'left';
  height: '500px';
  position: 'relative';
`;
