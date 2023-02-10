import React from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { NavBar } from '../common/components/navbar';

// export const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: 'dark',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary
// }));

export const HomePageContainer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Grid container spacing={3}>
        <Grid item xs={1} md={3}>
          <Paper>xs=6 md=8</Paper>
        </Grid>
        <Grid item xs={1} md={3}>
          <Paper>xs=6 md=4</Paper>
        </Grid>
        <Grid item xs={1} md={3}>
          <Paper>xs=6 md=4</Paper>
        </Grid>
        <Grid item xs={1} md={3}>
          <Paper>xs=6 md=8</Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
