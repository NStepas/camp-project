import { Container } from '@mui/system';
import { Grid, Skeleton } from '@mui/material';

import { StyledColumn } from '../../common/components/main-column';

import { useGetColumnQuery } from '../../../hooks/column-hooks/use-get-column';

export const MainColumn = () => {
  const { data: columnData, isLoading, isSuccess } = useGetColumnQuery() as any;

  if (isLoading) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  return (
    <Container>
      <Grid
        container
        spacing={3}
        sx={{
          overflowX: 'auto',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          width: '100%',
          height: '100%',
          display: 'grid',
          '@media (min-width: 780px)': {
            gridTemplateColumns: `repeat(${columnData.length},minmax(33.5%, 1fr))`
          },
          '@media (max-width: 780px)': {
            gridTemplateRows: `repeat(${columnData.length},minmax(fit-content, 1fr))`
          },
          margin: '0 auto'
        }}
      >
        {isSuccess &&
          columnData.map((data: any, index) => {
            return <StyledColumn data={data} index={data._id} key={index} />;
          })}
      </Grid>
    </Container>
    /* </div> */
  );
};
