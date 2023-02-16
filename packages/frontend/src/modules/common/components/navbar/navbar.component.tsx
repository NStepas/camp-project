import { useHistory } from 'react-router-dom';
import { Container, Toolbar } from '@mui/material';

import { MyNavBar } from '.';
import { StyledButton } from '../button-component';

import { NavbarButton } from '../../constants/button-component-config';
import { SIGN_IN_KEY } from '../../constants/app-keys.const';

import logo from '../../../../assets/icons/logo.svg';
import image from '../../../../assets/icons/image.svg';

export const NavBar = () => {
  let history = useHistory();

  const onLogoutHandler = async () => {
    localStorage.removeItem('user');
    history.push(SIGN_IN_KEY);
  };

  return (
    <MyNavBar position="static">
      <Container maxWidth="xl" sx={{ height: '3rem' }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: '0rem',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%'
            }}
          >
            <img
              src={logo}
              alt={logo}
              className="logo"
              style={{
                height: '2rem',
                width: '2rem',
                justifySelf: 'flex-start'
              }}
            />
          </Container>

          <Container sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <img
              src={image}
              alt={image}
              className="logo"
              style={{ height: '2rem', width: '2rem', marginRight: '1rem' }}
            />
            {NavbarButton.map((input, index) => (
              <StyledButton {...input} key={index} onClick={onLogoutHandler} />
            ))}
          </Container>
        </Toolbar>
      </Container>
    </MyNavBar>
  );
};
