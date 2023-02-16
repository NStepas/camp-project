import { Link } from 'react-router-dom';
import { Card, CardActions, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useFormik } from 'formik';

import { AuthStyledButton } from '../auth-button-component';
import { useSignInQuery } from '../../../hooks/auth-hooks/use-sign-in';

import { validate } from '../validation/signup-validation';
import { initialSignUpValue } from '../../common/constants/form-validation-constants';
import { ISignUpUser } from '../../common/types/auth.interface';
import {
  CardActionStyles,
  StyledAuthCard,
  StyledAuthContainer
} from '../../common/constants/styled-component.constants';
import { StyledInput } from '../../common/components/auth-input';
import { SignUpButton } from '../../common/constants/button-component-config';
import { SignUpComponentsConfig } from '../../common/constants/auth-components-config';
import { SIGN_IN_KEY } from '../../common/constants/app-keys.const';

import { COLORS } from '../../theme/colors.const';

export const SignUpContainer = () => {
  const handleSubmit = async (value: ISignUpUser) => {
    signInMutation.mutate(value as any);
  };

  const formik = useFormik({
    initialValues: initialSignUpValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  const signInMutation = useSignInQuery();

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
                  <AuthStyledButton {...input} key={index}></AuthStyledButton>
                ))}
              </CardActions>
            </CardActions>
          </Stack>
        </Card>
      </form>
    </Container>
  );
};
