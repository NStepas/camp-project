import { Container } from '@mui/system';
import { IconButton, InputAdornment } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CardTextFieldWrapper } from './column-name-input.styles';

import { ColorMithril } from '../../constants/card.styles';
import { useDeleteColumnQuery } from '../../../../hooks/column-hooks/use-delete-column';

export interface IStyledInputProps {
  defaultValue: string;
}

export const StyledColumnNameInput = ({ name }: IStyledInputProps | any) => {
  const deleteColumnMutation = useDeleteColumnQuery();

  const deleteItem = async () => {
    deleteColumnMutation.mutate(name);
  };

  return (
    <Container>
      <CardTextFieldWrapper
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
      />
    </Container>
  );
};
