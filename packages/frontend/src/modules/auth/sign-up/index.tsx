import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Card, CardActions, TextField, Typography, Button } from '@mui/material';
import { Container, Stack, styled } from '@mui/system';
import { useFormik } from 'formik';

import { initialValues, validate } from './formValidation';
import { signIn } from '../api/auth.api';
import { ISignUp } from '../../common/interfaces/auth.interface';
import { COLORS } from '../../theme/colors.const';

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
            <TextFieldWrapper
              id="name"
              name="name"
              label="Name"
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
              autoFocus={true}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.name)}
              helperText={formik.touched.password && formik.errors.password}
            />
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
                  CREATE ACCOUNT
                </Button>
              </CardActions>
            </CardActions>
          </Stack>
        </Card>
      </form>
    </Container>
  );
};
