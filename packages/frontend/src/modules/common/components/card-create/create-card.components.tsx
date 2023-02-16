import React, { useState } from 'react';

import { Container } from '@mui/system';
import { CardActions, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';

import { useCreateCardQuery } from '../../../../hooks/card-hooks/use-create-column';
import { CreateInputComponent } from '../create-input';
import { StyledCardButton } from '../card-button';
import { StyledButton } from '../button-component';
import { validate } from '../../../columns/validation/column-validation';

import { CardButton, CreateCardButton } from '../../constants/button-component-config';
import { initialCardValue } from '../../constants/form-validation-constants';
import { ColorMithril } from '../../constants/card.styles';

export const CreateCard = ({ id }: any) => {
  const [value, setValue] = useState();
  const [formIsOpen, setFormIsOpen] = useState(false);

  const values = { name: value, id: id };

  const createCardMutation = useCreateCardQuery();

  const handleChange = (values: any) => {
    setTimeout(() => {
      setValue(values.target.value);
    }, 500);
  };

  const handleSubmit = async () => {
    createCardMutation.mutate(values as any);
    setFormIsOpen(false);
  };

  const formik = useFormik({
    initialValues: initialCardValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  const openForm = () => {
    setFormIsOpen(true);
  };

  const closeForm = () => {
    setFormIsOpen(false);
  };

  return (
    <Container>
      {formIsOpen ? (
        <form onSubmit={formik.handleSubmit} onChange={handleChange}>
          <CreateInputComponent formik={formik} name={'input'} id={'input'} />
          <CardActions sx={{ padding: '0', paddingTop: '0.1rem' }}>
            {CreateCardButton.map((input, index) => (
              <StyledButton {...input} key={index} onClick={handleSubmit} />
            ))}
            <IconButton aria-label="delete" size="large" onClick={closeForm}>
              <ClearIcon sx={ColorMithril} />
            </IconButton>
          </CardActions>
        </form>
      ) : (
        CardButton.map((input, index) => (
          <StyledCardButton {...input} key={index} onClick={openForm} />
        ))
      )}
    </Container>
  );
};
