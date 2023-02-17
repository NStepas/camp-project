import styled from 'styled-components';
import { TextField } from '@mui/material';
import { COLORS } from '../../../theme';

export const CardTextFieldWrapper = styled(TextField)`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  size: small;
  background-color: ${COLORS.grey};

  padding: 0rem;
  margin-right: 0.3rem;
  margin: 0.1rem;

  div {
    outline: none;
    border: none;
    padding: 0rem;
  }

  fieldset: {
    border: none;
  }

  .css-v4u5dn-MuiInputBase-root-MuiInput-root.Mui-disabled {
    -webkit-text-fill-color: black !important;
  }
  .css-1x51dt5-MuiInputBase-input-MuiInput-input.Mui-disabled {
    -webkit-text-fill-color: black !important;
  }

  .css-v4u5dn-MuiInputBase-root-MuiInput-root {
    &:before,
    :after,
    :disabled,
    :hover:not(.Mui-disabled):before {
      border: 0;
      -webkit-text-fill-color: black !important;
    }
  }
  input {
    border: none;
    box-sizing: border-box;
    color: ${COLORS.black} !important;
    -webkit-text-fill-color: black;
  }
  & .css-1x51dt5-MuiInputBase-input-MuiInput-input {
    &:before,
    :after,
    :hover:not(.Mui-disabled):before {
      border: 0;
      -webkit-text-fill-color: 'black';
    }
  }

  && {
    box-sizing: border-box;
  }
`;
