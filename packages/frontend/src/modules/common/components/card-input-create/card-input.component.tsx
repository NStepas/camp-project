import { useState } from 'react';

import { Container } from '@mui/system';
import { IconButton, InputAdornment } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useFormik } from 'formik';

import { useDeleteCardQuery } from '../../../../hooks/card-hooks/use-delete-column';
import { useUpdateCardQuery } from '../../../../hooks/card-hooks/use-update-column';
import { CardTextFieldWrapper } from './card-input.styles';
import { IStyledInputProps } from '../../types/card.interfaces';
import { validate } from '../../../cards/validation/card-validation';

import { initialCardValue } from '../../constants/form-validation-constants';
import { ColorMithril } from '../../constants/card.styles';

export const StyledCard = (props: IStyledInputProps | any) => {
  const [value, setValue] = useState();

  const values = { name: value, cardId: props._id };

  const updateCardMutation = useUpdateCardQuery();

  const deleteCardMutation = useDeleteCardQuery();

  const handleSubmit = async () => {
    updateCardMutation.mutate(values as any);
  };

  const deleteCard = async () => {
    deleteCardMutation.mutate(props.cardName);
  };

  const handleChange = (values: any) => {
    setTimeout(() => {
      setValue(values.target.value);
    }, 500);
  };

  const handleKeySubmit = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return handleSubmit();
    }
  };

  const formik = useFormik({
    initialValues: initialCardValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  return (
    <Container sx={{ paddingBottom: '0.2rem', marginRight: '1rem', width: 'auto' }}>
      <form
        onSubmit={formik.handleSubmit}
        onChange={handleChange}
        onKeyDown={handleKeySubmit}
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <CardTextFieldWrapper
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="delete" name={props.cardName} onClick={deleteCard}>
                  <DeleteOutlineIcon sx={ColorMithril} />
                </IconButton>
              </InputAdornment>
            )
          }}
          id="outlined"
          variant="standard"
          defaultValue={props.cardName}
          onKeyPress={handleKeySubmit as any}
        />
      </form>
    </Container>
  );
};
