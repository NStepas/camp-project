import styled from 'styled-components';
import { TextField } from '@mui/material';
import { COLORS } from '../../../theme';

export const CardTextFieldWrapper = styled(TextField)`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  width: 120%;
  size: large;
  background-color: ${COLORS.white};
  padding-top: 0.5rem;

  .css-v4u5dn-MuiInputBase-root-MuiInput-root {
    &:before,
    :after,
    :hover:not(.Mui-disabled):before {
      border: 0;
    }
  }

  input {
    border: none;
    box-sizing: border-box;
    font-size: larger;
  }
  & .css-1x51dt5-MuiInputBase-input-MuiInput-input {
    &:before,
    :after,
    :hover:not(.Mui-disabled):before {
      border: 0;
    }
  }
`;
