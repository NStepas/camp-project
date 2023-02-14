import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { Container } from '@mui/system';
import { CardActions, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';

import { CreateInputComponent } from '../create-input';
import { StyledCardButton } from '../card-button';
import { createCardFn } from '../../../cards/services/card.services';
import { ErrorSnackbar } from '../error-snackbar/error-snackbar.component';
import { StyledButton } from '../button-component';
import { CardButton, CreateCardButton } from '../../constants/button-component-config';
import { validate } from '../../../columns/validation/column-validation';
import { initialCardValue } from '../../constants/form-validation-constants';
import { CARD_QUERY_KEY } from '../../constants/app-keys.const';
import { ICardCreate, ICardResponse } from '../../types/card.interfaces';

import { ColorMithril } from '../../constants/card.styles';

export const CreateCard = ({ id }: any) => {
  const [error, setError] = useState('');
  const [value, setValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);

  const values = { name: value, id: id };

  const createCardMutation = useMutation(
    CARD_QUERY_KEY,
    (values: ICardCreate) => createCardFn(values as any),
    {
      CARD_QUERY_KEY,
      onSuccess: async (cardData: ICardResponse[]) => {},
      onError: (data: any) => {
        setError(data.response?.data?.message);
        setIsOpen(true);
      }
    } as ICardResponse | any
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
    createCardMutation.mutate(values);
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
        CardButton.map((input, index) => (
          <StyledCardButton {...input} key={index} onClick={openForm} />
        ))
      )}
    </Container>
  );
};
