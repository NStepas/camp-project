import { useState } from 'react';
import { Container, IconButton, Toolbar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { BurgerMenu } from '../burger-menu';

import { MobileNavBarWrapper } from '.';
import { useMatchMedia } from '../../../../hooks/use-match-media';

import burgerMenu from '../../../../assets/icons/burger.menu.svg';
import logo from '../../../../assets/icons/logo.svg';
import { ColorMithril } from '../../constants/card.styles';

export const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isMobile } = useMatchMedia();

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container sx={{ padding: '0' }}>
      <MobileNavBarWrapper position="static">
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
            <Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {!isOpen && (
                <IconButton onClick={handleOpenMenu}>
                  <img
                    src={burgerMenu}
                    alt={burgerMenu}
                    className="logo"
                    style={{
                      height: '2rem',
                      width: '2rem',
                      justifySelf: 'flex-start'
                    }}
                  />
                </IconButton>
              )}

              {isOpen && (
                <IconButton aria-label="delete" size="large" onClick={handleCloseMenu}>
                  <ClearIcon sx={{ ColorMithril, fontSize: '2.5rem' }} />
                </IconButton>
              )}
            </Container>
          </Toolbar>
        </Container>
      </MobileNavBarWrapper>
      {isMobile && isOpen && (
        <BurgerMenu
          disableOverlayClick
          noOverlay
          onStateChange={isOpen}
          onClose={handleCloseMenu}
        />
      )}
    </Container>
  );
};
