import React from 'react';
import { Grid, Box, Card } from '@mui/material';
import { Container } from '@mui/system';

import { NavBar } from '../common/components/navbar';
import { MainColumn } from '../columns/column';
import { CreateColumn } from '../common/components/column-input-create/create-column.components';

import { HomeGridWrapper } from './home-page.styles';
import { COLORS } from '../theme';

export const HomePageContainer = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: `${COLORS.main}` }}>
      <NavBar />
      <Container>
        <HomeGridWrapper container spacing={3}>
          <Grid item xs={12} md={9}>
            <MainColumn />
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ padding: '0.5rem', height: 'fit-content', width: '16rem' }}>
              <CreateColumn />
            </Card>
          </Grid>
        </HomeGridWrapper>
      </Container>
    </Box>
  );
};
