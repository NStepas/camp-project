import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Alert, Card, CardActions, Snackbar, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useFormik } from 'formik';

import { validate } from './form-validation';
import { initialSignUpValue } from '../constants/form-validation-constants';
import { signUpFn } from '../servises/auth.api';
import { ISignUp, ISignUpResponse } from '../../common/interfaces/auth.interface';
import { COLORS } from '../../theme/colors.const';
import { componentsConfig } from './default-components.config';
import { StyledInput } from '../../common/styled-input';
import { StyledButton } from '../../common/styled-button';
import { SignUpButton } from '../../common/styled-button/default-components.config';
import {
  CardActionStyles,
  StyledAuthCard,
  StyledAuthContainer
} from '../../common/constants/styled-component.constants';
import { ErrorSnackbar } from '../../common/components/error-snackbar/error-snackbar.component';

export const SignUpContainer = () => {
  const [userError, setUserError] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleSubmit = async (value: ISignUp) => {
    signInMutation.mutate(value);
  };

  const formik = useFormik({
    initialValues: initialSignUpValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  const signInMutation = useMutation('/sign-up', (user: ISignUp) => signUpFn(user), {
    onSuccess: async (data: ISignUpResponse) => {
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
  } as ISignUpResponse | any);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={StyledAuthContainer}>
      <form onSubmit={formik.handleSubmit}>
        <Card sx={StyledAuthCard}>
          <Typography gutterBottom variant="h5" component="div">
            Sign Up
          </Typography>
          <Stack spacing={2} sx={{ mt: '3rem' }}>
            {componentsConfig.map((input) => (
              <StyledInput {...input} key={input.name} formik={formik} />
            ))}

            <CardActions sx={CardActionStyles}>
              <div>
                <div>
                  <Typography style={{ color: `${COLORS.mithril}` }}>Already a member?</Typography>
                  <Link to="/sign-in" style={{ color: `${COLORS.indigo}` }}>
                    Sign In
                  </Link>
                </div>
              </div>
              <CardActions>
                {SignUpButton.map((input) => (
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
