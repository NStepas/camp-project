import styled from 'styled-components';
import { TextField } from '@mui/material';
import { COLORS } from '../../../theme';

export const CardTextFieldWrapper = styled(TextField)`
  boxsizing: border-box;
  size: small;
  backgroundcolor: ${COLORS.grey};
  padding: 0rem;
`;
