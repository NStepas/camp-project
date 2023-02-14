import { Card } from '@mui/material';
import styled from 'styled-components';

export const CardWrapper = styled(Card)`
  margin: 0;
  padding: 0;
  height: 100%;

  display: flex;
  flex-direction: row;
  padding-left: 1rem;
  div {
    padding: 0;
  }
  input {
    width: 75%;
    margin-top: 0.5rem;
    padding: 0.5rem;
  }
`;
