import { Container } from '@mui/system';
import { IconButton, InputAdornment } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CardTextFieldWrapper } from './column-name-input.styles';

import { ColorMithril } from '../../constants/card.styles';
import { useDeleteColumnQuery } from '../../../../hooks/column-hooks/use-delete-column';
import { useState } from 'react';
export interface IStyledInputProps {
  defaultValue: string;
}

export const StyledColumnNameInput = ({ name }: IStyledInputProps | any) => {
  const [isInputVisible, setIsInputVisible] = useState(true);

  const deleteColumnMutation = useDeleteColumnQuery();

  const deleteItem = async () => {
    deleteColumnMutation.mutate(name);
  };

  const handleKeySubmit = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsInputVisible(true);
    }
  };

  const handleVisibleInput = () => {
    setIsInputVisible(false);
  };

  return (
    <Container>
      <CardTextFieldWrapper
        disabled={isInputVisible}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="delete" onClick={deleteItem}>
                <DeleteOutlineIcon sx={ColorMithril} />
              </IconButton>
            </InputAdornment>
          )
        }}
        id="outlined"
        variant="standard"
        defaultValue={name}
        onKeyPress={handleKeySubmit as any}
        onClick={handleVisibleInput}
      />
    </Container>
  );
};
