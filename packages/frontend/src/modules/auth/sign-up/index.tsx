import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Card, CardActions, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useFormik } from 'formik';

import { ErrorSnackbar } from '../../common/components/error-snackbar/error-snackbar.component';
import { StyledInput } from '../../common/components/auth-input';
import { StyledButton } from '../../common/components/button-component';
import { SignUpButton } from '../../common/constants/button-component-config';

import { LocalStorageActions } from '../validation/local-storage.actions';
import { localStorageUserData } from '../../common/services/main.services';
import { validate } from '../validation/signup-validation';
import { initialSignUpValue } from '../../common/constants/form-validation-constants';
import { signUpFn } from '../servises/auth.services';
import { ISignUpResponse, ISignUpUser } from '../../common/types/auth.interface';
import {
  CardActionStyles,
  StyledAuthCard,
  StyledAuthContainer
} from '../../common/constants/styled-component.constants';
import { SignUpComponentsConfig } from '../../common/constants/auth-components-config';
import {
  ROUTER_KEYS,
  SIGN_IN_KEY,
  SIGN_UP_KEY,
  USER_QUERY_KEY
} from '../../common/constants/app-keys.const';

import { COLORS } from '../../theme/colors.const';

export const SignUpContainer = () => {
  const [userError, setUserError] = useState('');
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const handleSubmit = async (value: ISignUpUser) => {
    signInMutation.mutate(value);
  };

  const formik = useFormik({
    initialValues: initialSignUpValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  const signInMutation = useMutation(SIGN_UP_KEY, (user: ISignUpUser) => signUpFn(user), {
    USER_QUERY_KEY,
    onSuccess: async (data: ISignUpResponse) => {
      LocalStorageActions(data as any);

      const localStorageData = JSON.parse(localStorageUserData);
      localStorageData.token && history.push(ROUTER_KEYS.ROOT);
    },

    onError: (data: any) => {
      setUserError(data.response?.data?.message);
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
            {SignUpComponentsConfig.map((input) => (
              <StyledInput {...input} key={input.name} formik={formik} />
            ))}

            <CardActions sx={CardActionStyles}>
              <div>
                <div>
                  <Typography style={{ color: `${COLORS.mithril}` }}>Already a member?</Typography>
                  <Link to={SIGN_IN_KEY} style={{ color: `${COLORS.indigo}` }}>
                    Sign In
                  </Link>
                </div>
              </div>
              <CardActions>
                {SignUpButton.map((input, index) => (
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
