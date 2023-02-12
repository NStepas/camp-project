import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Card, CardActions, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useFormik } from 'formik';

import { signInFn } from '../servises/auth.services';
import { validate } from '../validation/signin-validation';
import { initialSignInValue } from '../../common/constants/form-validation-constants';
import { ISignInResponse, ISignInUser } from '../../common/types/auth.interface';

import { StyledInput } from '../../common/components/auth-input';
import { ErrorSnackbar } from '../../common/components/error-snackbar/error-snackbar.component';
import { SignInButton } from '../../common/constants/button-component-config';
import { StyledButton } from '../../common/components/button-component';

import { LocalStorageActions } from '../validation/local-storage.actions';
import { localStorageUserData } from '../../common/services/main.services';
import { SignInComponentsConfig } from '../../common/constants/auth-components-config';
import {
  CardActionStyles,
  StyledAuthCard,
  StyledAuthContainer
} from '../../common/constants/styled-component.constants';
import {
  ROUTER_KEYS,
  SIGN_IN_KEY,
  SIGN_UP_KEY,
  USER_QUERY_KEY
} from '../../common/constants/app-keys.const';

import { COLORS } from '../../theme/colors.const';

export const SignInContainer = () => {
  const [userError, setUserError] = useState('');
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const handleSubmit = async (value: ISignInUser) => {
    signInMutation.mutate(value);
  };

  const formik = useFormik({
    initialValues: initialSignInValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  const signInMutation = useMutation(SIGN_IN_KEY, (user: ISignInUser) => signInFn(user), {
    USER_QUERY_KEY,
    onSuccess: async (data: ISignInResponse) => {
      LocalStorageActions(data as any);
      const localStorageData = JSON.parse(localStorageUserData);
      localStorageData.token && history.push(ROUTER_KEYS.ROOT);
    },

    onError: (data: any) => {
      setUserError(data.response?.data?.message);
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
            {SignInComponentsConfig.map((input) => (
              <StyledInput {...input} key={input.name} formik={formik} />
            ))}

            <CardActions sx={CardActionStyles}>
              <div>
                <div>
                  <p style={{ color: `${COLORS.mithril}` }}>Need an account?</p>
                  <Link to={SIGN_UP_KEY} style={{ color: `${COLORS.indigo}` }}>
                    Sign Up
                  </Link>
                </div>
              </div>
              <CardActions>
                {SignInButton.map((input, index) => (
                  <StyledButton {...input} key={index}></StyledButton>
                ))}
              </CardActions>
            </CardActions>
          </Stack>
        </Card>
      </form>

      {userError && (
        <ErrorSnackbar
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          errorMessage={userError}
        />
      )}
    </Container>
  );
};
