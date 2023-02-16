import { Card } from '@mui/material';
import styled from 'styled-components';

export const CardWrapper = styled(Card)`
  margin: 10px auto;
  padding: 0;

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
