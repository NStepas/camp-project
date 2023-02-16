import React from 'react';
import { Grid, Box, Card } from '@mui/material';

import { NavBar } from '../common/components/navbar';
import { MainColumn } from '../columns/column';
import { CreateColumn } from '../common/components/column-input-create/create-column.components';

import { HomeGridWrapper, MainContainer } from './home-page.styles';
import { COLORS } from '../theme';
import { useMatchMedia } from '../../hooks/use-match-media';
import { MobileNavBar } from '../common/components/mobile-navbar';

export const HomePageContainer = () => {
  const { isMobile } = useMatchMedia();

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: `${COLORS.main}` }}>
      <MainContainer>
        {!isMobile ? <NavBar /> : <MobileNavBar />}
        <HomeGridWrapper container spacing={3}>
          <Grid item xs={12} md={9}>
            <MainColumn />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
          >
            <Card sx={{ padding: '0.5rem', height: 'fit-content', width: '16rem' }}>
              <CreateColumn />
            </Card>
          </Grid>
        </HomeGridWrapper>
      </MainContainer>
    </Box>
  );
};
