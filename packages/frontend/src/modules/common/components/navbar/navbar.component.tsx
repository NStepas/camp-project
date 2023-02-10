import * as React from 'react';
import { Container, Toolbar, Typography, Box, Button } from '@mui/material';
import { MyNavBar } from '.';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { StyledButton } from '../../styled-button';
import { navbarButton } from '../../styled-button/default-components.config';
import { useMutation } from 'react-query';
import { logoutUserFn } from '../../../auth/servises/auth.api';

export const NavBar = () => {
  const { mutate: logoutUser, isLoading } = useMutation(async () => await logoutUserFn(), {
    onSuccess: (data) => {
      window.location.href = '/login';
    },
    onError: (error: any) => {
      if (Array.isArray(error.response.data.error)) {
        error.data.error.forEach((el: any) =>
          error(el.message, {
            position: 'top-right'
          })
        );
      } else {
        error(error.response.data.message, {
          position: 'top-right'
        });
      }
    }
  });

  const onLogoutHandler = async () => {
    logoutUser();
  };
  return (
    <MyNavBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography>
          <InsertPhotoOutlinedIcon />
          {navbarButton.map((input) => {
            <StyledButton {...input} key={Math.random()} />;
          })}
          <Button onClick={onLogoutHandler}>Logout</Button>
          <Box sx={{ flexGrow: 0 }}>hell</Box>
        </Toolbar>
      </Container>
    </MyNavBar>
  );
};
