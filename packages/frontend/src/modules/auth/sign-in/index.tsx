import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Card, CardActions, Typography, Button } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useFormik } from 'formik';

import { validate } from './form-validation';
import { initialSignInValue } from '../constants/form-validation-constants';
import { signIn } from '../servises/auth.api';
import { ISignIn } from '../../common/interfaces/auth.interface';
import { COLORS } from '../../theme/colors.const';
import { componentsConfig } from './default-components.config';
import { StyledInput } from '../../common/styled-input';

export const SignInContainer = () => {
  const queryClient = useQueryClient();

  const handleSubmit = (value: ISignIn) => {
    console.log(value);
    signInMutation.mutate(value);
  };

  const formik = useFormik({
    initialValues: initialSignInValue,
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
            {componentsConfig.map((input) => (
              <StyledInput {...input} key={input.name} formik={formik} />
            ))}

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
