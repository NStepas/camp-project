import styled from 'styled-components';
import { TextField } from '@mui/material';
import { COLORS } from '../../theme';

export const TextFieldWrapper = styled(TextField)`
  fieldset {
    border: inherit;
    border-radius: 1.5rem;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${COLORS.grey} inset !important;
  }
  input {
    color: ${COLORS.black};
    background-color: ${COLORS.grey};
    border-radius: 1.5rem;
  }
  input:-webkit-autofill {
    -webkit-background-clip: text;
  }
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill {
    background-color: white;
    color: white;
    border-radius: 1.5rem;
  }
`;
