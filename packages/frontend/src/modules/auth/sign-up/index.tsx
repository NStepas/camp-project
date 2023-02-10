import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardActions, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useFormik } from 'formik';

import { validate } from './form-validation';
import { initialSignUpValue } from '../constants/form-validation-constants';
import { signUp } from '../servises/auth.api';
import { ISignUp } from '../../common/interfaces/auth.interface';
import { COLORS } from '../../theme/colors.const';
import { componentsConfig } from './default-components.config';
import { StyledInput } from '../../common/styled-input';
import { StyledButton } from '../../common/styled-button';
import { SignUpButton } from '../../common/styled-button/default-components.config';
import { useState } from 'react';

export const SignUpContainer = () => {
  const queryClient = useQueryClient();

  const handleSubmit = (value: ISignUp) => {
    console.log(value);
    signInMutation.mutate(value);
  };

  const formik = useFormik({
    initialValues: initialSignUpValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  const signInMutation = useMutation(signUp, {
    onSuccess: () => {
      queryClient.invalidateQueries('signUpData' as any);
      // queryClient.setQueryData(['posts', data], data);
    }
  });

  return (
    <Container
      sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            width: '25rem',
            justifyContent: 'center',
            border: 'none',
            boxShadow: 'none'
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Sign Up
          </Typography>
          <Stack spacing={2} sx={{ mt: '3rem' }}>
            {componentsConfig.map((input) => (
              <StyledInput {...input} key={input.name} formik={formik} />
            ))}

            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div>
                  <Typography style={{ color: `${COLORS.grey}` }}>Already a member?</Typography>
                  <Link to="/sign-in" style={{ color: `${COLORS.indigo}` }}>
                    Sign In
                  </Link>
                </div>
              </div>
              <CardActions>
                {SignUpButton.map((input) => (
                  <StyledButton {...input}></StyledButton>
                ))}
              </CardActions>
            </CardActions>
          </Stack>
        </Card>
      </form>
    </Container>
  );
};
