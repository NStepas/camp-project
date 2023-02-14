import { useState } from 'react';
import { useMutation } from 'react-query';

import { Container } from '@mui/system';
import { IconButton, InputAdornment } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CardTextFieldWrapper } from './column-name-input.styles';
import { deleteColumnFn } from '../../../columns/services/column.services';
import { ErrorSnackbar } from '../error-snackbar/error-snackbar.component';

import { COLUMN_QUERY_KEY } from '../../constants/app-keys.const';
import { IColumnDelete, IColumnResponse } from '../../types/column.interface';
import { ColorMithril } from '../../constants/card.styles';

export interface IStyledInputProps {
  defaultValue: string;
}

export const StyledColumnNameInput = ({ name }: IStyledInputProps | any) => {
  const [columnError, setColumnError] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const deleteColumnMutation = useMutation(
    COLUMN_QUERY_KEY,
    (values: IColumnDelete) => deleteColumnFn(values as any),
    {
      COLUMN_QUERY_KEY,
      // onSuccess: async (columnData: IColumnResponse[]) => {
      //   // setColumnData(columnData);
      // },

      onError: (data: any) => {
        setColumnError(data.response?.data?.message);
        setIsOpen(true);
      }
    } as IColumnResponse | any
  );

  const deleteItem = async () => {
    deleteColumnMutation.mutate(name);
  };

  const handleClose = () => {
    setIsOpen(false);
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
      {columnError && (
        <ErrorSnackbar
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          errorMessage={columnError}
        />
      )}
    </Container>
  );
};
