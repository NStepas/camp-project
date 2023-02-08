import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Card, CardActions, TextField, Typography } from '@mui/material';
import { Container, Stack, styled } from '@mui/system';
import { useFormik } from 'formik';
import { Button } from '@mui/material';

import { initialValues, validate } from './formValidation';
import { signIn } from '../api/auth.api';
import { ISignIn } from '../../shared/interfaces/auth.interface';
import { COLORS } from '../../theme/colors.const';
export const TextFieldWrapper = styled(TextField)`
  fieldset {
    border: inherit;
    border-radius: 1.5rem;

    color: ${COLORS.grey};
  }
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill {
    backgrund-color: white;
    color: white;
    border-radius: 1.5rem;
  }
`;

export const SignInContainer = () => {
  const queryClient = useQueryClient();
  const handleSubmit = (value: ISignIn) => {
    console.log(value);
    signInMutation.mutate(value);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  const signInMutation = useMutation(signIn, {
    onSuccess: () => {
      queryClient.invalidateQueries('signInData');
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
            Sign In
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
                  <p style={{ color: `${COLORS.grey}` }}>Need an account?</p>
                  <Link to="/sign-up" style={{ color: `${COLORS.indigo}` }}>
                    Sign Up
                  </Link>
                </div>
              </div>
              <CardActions sx={{ justifyContent: 'end' }}>
                <Button
                  variant="contained"
                  type="submit"
                  size="small"
                  sx={{ backgroundColor: `${COLORS.indigo}` }}
                >
                  Submit
                </Button>
              </CardActions>
            </CardActions>
          </Stack>
        </Card>
      </Container>
    </form>
  );
};
