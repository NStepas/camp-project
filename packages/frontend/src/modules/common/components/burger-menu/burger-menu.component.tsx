import { useHistory } from 'react-router-dom';
import { Container } from '@mui/system';
import { stack as Menu } from 'react-burger-menu';

import { MainMenu } from '.';
import { StyledButton } from '../button-component';

import { SIGN_IN_KEY } from '../../constants/app-keys.const';
import { NavbarButton } from '../../constants/button-component-config';

import image from '../../../../assets/icons/image.svg';

export const BurgerMenu = ({ isOpen }: any) => {
  let history = useHistory();

  const onLogoutHandler = async () => {
    localStorage.removeItem('user');
    history.push(SIGN_IN_KEY);
  };
  console.log(isOpen);
  return (
    <Menu right width={'100%'}>
      <MainMenu>
        <Container sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <img src={image} alt={image} className="logo" style={{ height: '3rem', width: '3rem' }} />
          {NavbarButton.map((input, index) => (
            <StyledButton
              {...input}
              key={index}
              onClick={onLogoutHandler}
              sx={{ margin: '0.5rem', fontSize: 'large' }}
            />
          ))}
        </Container>
      </MainMenu>
    </Menu>
  );
};
