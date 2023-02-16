import { Link } from 'react-router-dom';
import { Card, CardActions, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useFormik } from 'formik';

import { validate } from '../validation/signin-validation';

import { AuthStyledButton } from '../auth-button-component';
import { useSignInQuery } from '../../../hooks/auth-hooks/use-sign-in';

import { StyledInput } from '../../common/components/auth-input';
import { SignInButton } from '../../common/constants/button-component-config';
import { SignInComponentsConfig } from '../../common/constants/auth-components-config';
import {
  CardActionStyles,
  StyledAuthCard,
  StyledAuthContainer
} from '../../common/constants/styled-component.constants';
import { SIGN_UP_KEY } from '../../common/constants/app-keys.const';
import { initialSignInValue } from '../../common/constants/form-validation-constants';
import { ISignInUser } from '../../common/types/auth.interface';

import { COLORS } from '../../theme/colors.const';

export const SignInContainer = () => {
  const handleSubmit = async (value: ISignInUser) => {
    signInMutation.mutate(value as any);
  };

  const formik = useFormik({
    initialValues: initialSignInValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  const signInMutation = useSignInQuery();

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
                  <AuthStyledButton {...input} key={index} />
                ))}
              </CardActions>
            </CardActions>
          </Stack>
        </Card>
      </form>
    </Container>
  );
};
