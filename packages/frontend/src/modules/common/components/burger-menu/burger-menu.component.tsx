import { useHistory } from 'react-router-dom';
import { Container } from '@mui/system';
import { stack as Menu } from 'react-burger-menu';

import { MainMenu } from '.';
import { StyledButton } from '../button-component';

import { SIGN_IN_KEY } from '../../constants/app-keys.const';
import { NavbarButton } from '../../constants/button-component-config';

import image from '../../../../assets/icons/image.svg';
import { useState } from 'react';

export const BurgerMenu = ({ isOpen }: any) => {
  const [areMenusOpen, setAreMenusOpen] = useState(true);
  let history = useHistory();

  const onLogoutHandler = async () => {
    localStorage.removeItem('user');
    history.push(SIGN_IN_KEY);
  };

  const handleOnClose = () => {
    isOpen(false);
  };

  const closeAllMenusOnEsc = (e: any) => {
    e = e || window.Event;

    if (e.key === 'Escape' || e.keyCode === 27) {
      setAreMenusOpen(false);
    }
  };
  return (
    <div id="outer-container">
      <Menu
        right
        width={'100%'}
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        isOpen={areMenusOpen}
        onClose={handleOnClose}
        customOnKeyDown={closeAllMenusOnEsc}
        disableOverlayClick
        customBurgerIcon={false}
        customCrossIcon={false}
      >
        <MainMenu id="page-wrap">
          <Container sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <img
              src={image}
              alt={image}
              className="logo"
              style={{ height: '3rem', width: '3rem' }}
            />
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
    </div>
  );
};
