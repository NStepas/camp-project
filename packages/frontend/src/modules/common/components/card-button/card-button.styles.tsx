import styled from 'styled-components';
import { Button } from '@mui/material';
import { COLORS } from '../../../theme';

export const CardButtonWrraper = styled(Button)`
  display: flex;
  justify-content: flex-end;
  padding: 0px !important;
  height: fit-content;
  width: max-content;
  && {
    border-radius: 1.5rem;
    color: ${COLORS.mithril};
  }
`;
