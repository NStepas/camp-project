import React, { useState } from 'react';

import { Container } from '@mui/system';
import { CardActions, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';

import { validate } from '../../../columns/validation/column-validation';
import { StyledCardButton } from '../card-button';
import { CreateInputComponent } from '../create-input';
import { StyledButton } from '../button-component';

import { ColumnButton, CreateColumnButton } from '../../constants/button-component-config';
import { initialColumnValue } from '../../constants/form-validation-constants';

import { ColorMithril } from '../../constants/card.styles';
import { useCreateColumnQuery } from '../../../../hooks/column-hooks/use-create-column';

export const CreateColumn = () => {
  const [value, setValue] = useState();
  const [formIsOpen, setFormIsOpen] = useState(false);

  const createColumnMutation = useCreateColumnQuery();

  const handleChange = (values: any) => {
    setTimeout(() => {
      setValue(values.target.value);
    }, 500);
  };

  const handleSubmit = async () => {
    createColumnMutation.mutate(value);
    setFormIsOpen(false);
  };

  const formik = useFormik({
    initialValues: initialColumnValue,
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
            {CreateColumnButton.map((input, index) => (
              <StyledButton {...input} key={index} onClick={handleSubmit} />
            ))}
            <IconButton aria-label="delete" size="large" onClick={closeForm}>
              <ClearIcon sx={ColorMithril} />
            </IconButton>
          </CardActions>
        </form>
      ) : (
        ColumnButton.map((input, index) => (
          <StyledCardButton {...input} key={index} onClick={openForm} />
        ))
      )}
    </Container>
  );
};
