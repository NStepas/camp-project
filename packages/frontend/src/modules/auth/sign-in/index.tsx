import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Card, CardActions, Typography, Alert, Snackbar } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useFormik } from 'formik';

import { signInFn } from '../servises/auth.api';
import { validate } from './form-validation';
import { initialSignInValue } from '../constants/form-validation-constants';
import { ISignIn, ISignInResponse } from '../../common/interfaces/auth.interface';

import { componentsConfig } from './default-components.config';
import { StyledInput } from '../../common/styled-input';

import { COLORS } from '../../theme/colors.const';
import { SignInButton } from '../../common/styled-button/default-components.config';
import { StyledButton } from '../../common/styled-button';
import {
  CardActionStyles,
  StyledAuthCard,
  StyledAuthContainer
} from '../../common/constants/styled-component.constants';
import { ErrorSnackbar } from '../../common/components/error-snackbar/error-snackbar.component';

export const SignInContainer = () => {
  const [userError, setUserError] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleSubmit = async (value: ISignIn) => {
    signInMutation.mutate(value);
  };

  const formik = useFormik({
    initialValues: initialSignInValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  const signInMutation = useMutation('/sign-up', (user: ISignIn) => signInFn(user), {
    onSuccess: async (data: ISignInResponse) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: data.name,
          token: data.jwtToken
        })
      );
      const localStorageData = JSON.parse(localStorage.getItem('user') || '{}');
      localStorageData.token ? history.push('/') : null;
    },
    onError: (data: any) => {
      setUserError(data.response.data.message);
      setOpen(true);
    }
  } as ISignInResponse | any);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={StyledAuthContainer}>
      <form onSubmit={formik.handleSubmit}>
        <Card sx={StyledAuthCard}>
          <Typography gutterBottom variant="h5" component="div">
            Sign In
          </Typography>
          <Stack spacing={2} sx={{ mt: '3rem' }}>
            {componentsConfig.map((input) => (
              <StyledInput {...input} key={input.name} formik={formik} />
            ))}

            <CardActions sx={CardActionStyles}>
              <div>
                <div>
                  <p style={{ color: `${COLORS.mithril}` }}>Need an account?</p>
                  <Link to="/sign-up" style={{ color: `${COLORS.indigo}` }}>
                    Sign Up
                  </Link>
                </div>
              </div>
              <CardActions>
                {SignInButton.map((input) => (
                  <StyledButton {...input} key={Math.random()}></StyledButton>
                ))}
              </CardActions>
            </CardActions>
          </Stack>
        </Card>
      </form>
      {userError ? (
        <ErrorSnackbar
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          errorMessage={userError}
        />
      ) : null}
    </Container>
  );
};
