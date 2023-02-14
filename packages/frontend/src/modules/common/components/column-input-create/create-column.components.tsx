import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { Container } from '@mui/system';
import { CardActions, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';

import { validate } from '../../../columns/validation/column-validation';
import { StyledCardButton } from '../card-button';
import { CreateInputComponent } from '../create-input';
import { ErrorSnackbar } from '../error-snackbar/error-snackbar.component';
import { StyledButton } from '../button-component';

import { IColumnCreate, IColumnResponse } from '../../types/column.interface';
import { COLUMN_QUERY_KEY } from '../../constants/app-keys.const';
import { createColumnFn } from '../../../columns/services/column.services';
import { ColumnButton, CreateColumnButton } from '../../constants/button-component-config';
import { initialColumnValue } from '../../constants/form-validation-constants';

import { ColorMithril } from '../../constants/card.styles';

export const CreateColumn = () => {
  const [error, setError] = useState('');
  const [value, setValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);

  const createColumnMutation = useMutation(
    COLUMN_QUERY_KEY,
    (value: IColumnCreate) => createColumnFn(value as any),
    {
      COLUMN_QUERY_KEY,
      onSuccess: async () => {},
      onError: (data: any) => {
        setError(data.response?.data?.message);
        setIsOpen(true);
      }
    } as IColumnResponse | any
  );

  const handleClose = () => {
    setIsOpen(false);
  };

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
          {isOpen && (
            <ErrorSnackbar
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              errorMessage={error}
            />
          )}
        </form>
      ) : (
        ColumnButton.map((input, index) => (
          <StyledCardButton {...input} key={index} onClick={openForm} />
        ))
      )}
    </Container>
  );
};
