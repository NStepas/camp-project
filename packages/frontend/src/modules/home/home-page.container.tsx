import React from 'react';
import { Grid, Box, Card } from '@mui/material';

import { NavBar } from '../common/components/navbar';
import { StyledCardButton } from '../common/components/card-button';
import { columnButton } from '../common/constants/button-component-config';

import { COLORS } from '../theme';
import { StyledColumn } from '../common/components/main-column';
import { MainColumn } from '../columns/column';
import { Container } from '@mui/system';

export const HomePageContainer = () => {
  // const theme = createTheme as any({
  //   overrides: {
  //     MuiCssBaseline: {
  //       '@global': {
  //         '*::-webkit-scrollbar': {
  //           width: '5px'
  //         },
  //         '*::-webkit-scrollbar-track': {
  //           background: '#E4EFEF'
  //         },
  //         '*::-webkit-scrollbar-thumb': {
  //           background: '#1D388F61',
  //           borderRadius: '2px'
  //         }
  //       }
  //     }
  //   }
  // })
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: `${COLORS.main}`, height: '100vh' }}>
      <NavBar />
      <Container>
        <Grid container spacing={3} sx={{ margin: '0', flexWrap: 'nowrap' }}>
          {/* <Grid item xs={1} md={3}> */}
          <MainColumn />
          {/* </Grid> */}
          <Grid item>
            <Card sx={{ padding: '0.5rem' }}>
              {columnButton.map((input, index) => (
                <StyledCardButton {...input} key={index}></StyledCardButton>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
