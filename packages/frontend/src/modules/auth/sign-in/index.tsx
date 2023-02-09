import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Card, CardActions, TextField, Typography, Button } from '@mui/material';
import { Container, Stack, styled } from '@mui/system';
import { useFormik } from 'formik';

import { initialValues, validate } from './formValidation';
import { signIn } from '../api/auth.api';
import { ISignIn } from '../../common/interfaces/auth.interface';
import { COLORS } from '../../theme/colors.const';
import { WEIGHTS } from '../../theme/fonts.const';

export const TextFieldWrapper = styled(TextField)`
  fieldset {
    border: inherit;
    border-radius: 1.5rem;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${COLORS.lightgrey} inset !important;
  }
  input {
    color: ${COLORS.grey};
    background-color: ${COLORS.lightgrey};
    border-radius: 1.5rem;
  }
  input:-webkit-autofill {
    -webkit-background-clip: text;
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
            Sign In
          </Typography>
          <Stack spacing={2} sx={{ mt: '3rem' }}>
            <TextFieldWrapper
              id="name"
              name="name"
              label="Name/Email"
              variant="outlined"
              autoFocus={true}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextFieldWrapper
              id="password"
              name="password"
              label="Password"
              type="password"
              autoFocus={true}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.name)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div>
                  <p style={{ color: `${COLORS.grey}` }}>Need an account?</p>
                  <Link to="/sign-up" style={{ color: `${COLORS.indigo}` }}>
                    Sign Up
                  </Link>
                </div>
              </div>
              <CardActions>
                <Button
                  variant="contained"
                  type="submit"
                  size="small"
                  sx={{
                    backgroundColor: `${COLORS.indigo}`,
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    width: '10rem',
                    borderRadius: '1.5rem'
                  }}
                >
                  LOGIN
                </Button>
              </CardActions>
            </CardActions>
          </Stack>
        </Card>
      </form>
    </Container>
  );
};
