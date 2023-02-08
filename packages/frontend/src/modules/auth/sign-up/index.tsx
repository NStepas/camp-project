import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Card, CardActions, TextField, Typography, Button } from '@mui/material';
import { Container, Stack, styled } from '@mui/system';
import { useFormik } from 'formik';

import { initialValues, validate } from './formValidation';
import { signIn } from '../api/auth.api';
import { ISignUp } from '../../shared/interfaces/auth.interface';
import { COLORS } from '../../theme/colors.const';
export const TextFieldWrapper = styled(TextField)`
  fieldset {
    border: inherit;
    border-radius: 1.5rem;
    color: ${COLORS.grey};
  }

  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill {
    color: grey;
    border-radius: 1.5rem;
  }
`;
export const StyledButton = styled(Button)`
  .css-j1tjve-MuiButtonBase-root-MuiButton-root {
    margin-top: 5rem;
    background-color: ${COLORS.indigo};
    color: red;
  }
`;

export const SignUpContainer = () => {
  const queryClient = useQueryClient();
  const handleSubmit = (value: ISignUp) => {
    console.log(value);
    signUpMutation.mutate(value);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  const signUpMutation = useMutation(signIn, {
    onSuccess: () => {
      queryClient.invalidateQueries('signUpData');
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container sx={{ maxWidth: '24rem', justifyContent: 'center' }}>
        <Card
          sx={{
            maxWidth: '24rem',
            justifyContent: 'center',
            border: 'none',
            boxShadow: 'none'
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Sign Up
          </Typography>
          <Stack spacing={4} sx={{ mt: '3rem' }}>
            <TextFieldWrapper
              id="name"
              name="name"
              label="Name"
              autoComplete="current-name"
              variant="outlined"
              autoFocus={true}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              // sx={{ borderRadius: 21 }}
            />
            <TextFieldWrapper
              id="email"
              name="email"
              label="Email"
              autoComplete="current-email"
              variant="outlined"
              autoFocus={true}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextFieldWrapper
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              autoFocus={true}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.name)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <CardActions>
              <div>
                <div>
                  <p style={{ color: `${COLORS.grey}` }}>Already a member?</p>
                  <Link to="/sign-in" style={{ color: `${COLORS.indigo}` }}>
                    Sign In
                  </Link>
                </div>
              </div>
              <CardActions sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <StyledButton
                  variant="contained"
                  type="submit"
                  size="small"
                  sx={{
                    backgroundColor: `${COLORS.indigo}`,
                    display: 'flex',
                    flexDirection: 'row-reverse'
                  }}
                >
                  CREATE ACCOUNT
                </StyledButton>
              </CardActions>
            </CardActions>
          </Stack>
        </Card>
      </Container>
    </form>
  );
};
