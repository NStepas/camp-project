import { useHistory } from 'react-router-dom';
import { Container, Toolbar, Typography, Box, Button } from '@mui/material';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

import { MyNavBar } from '.';
import { StyledButton } from '../button-component';

import { localStorageUserData } from '../../services/main.services';
import { navbarButton } from '../../constants/button-component-config';
import { SIGN_IN_KEY } from '../../constants/app-keys.const';

export const NavBar = () => {
  const history = useHistory();

  const onLogoutHandler = async () => {
    const localStorageData = await JSON.parse(localStorageUserData);
    !localStorageData.token && history.push(SIGN_IN_KEY);
  };

  return (
    <MyNavBar position="static">
      <Container maxWidth="xl" sx={{ height: '3rem' }}>
        <Toolbar disableGutters sx={{ minHeight: '0rem' }}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 4,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography>
          <InsertPhotoOutlinedIcon />

          {navbarButton.map((input, index) => {
            <StyledButton {...input} key={index} />;
          })}

          <Button onClick={onLogoutHandler}>Logout</Button>
          <Box sx={{ flexGrow: 0 }}>hell</Box>
        </Toolbar>
      </Container>
    </MyNavBar>
  );
};
