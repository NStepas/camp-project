import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';

import { Container } from '@mui/system';
import { Grid } from '@mui/material';

import { getColumnFn } from '../services/column.services';
import { StyledColumn } from '../../common/components/main-column';
import { COLUMN_QUERY_KEY } from '../../common/constants/app-keys.const';
import { IColumnResponse } from '../../common/types/column.interface';
import { ErrorSnackbar } from '../../common/components/error-snackbar/error-snackbar.component';
import { localStorageUserData } from '../../common/services/main.services';
import { useMatchMedia } from '../../../hooks/use-match-media';
import { useScrollbar } from '../../../hooks/use-scrollbar';

export const MainColumn = () => {
  const [userError, setUserError] = useState('');
  const [columnData, setColumnData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { isMobile } = useMatchMedia();
  const todoWrapper = useRef(null);
  const hasScroll = isMobile || columnData.length > 3;
  useScrollbar(todoWrapper, hasScroll);

  const localStorageData = JSON.parse(localStorageUserData);
  const token = localStorageData.token;

  const getColumnMutation = useMutation(COLUMN_QUERY_KEY, async () => await getColumnFn(), {
    COLUMN_QUERY_KEY,
    onSuccess: async (columnData: IColumnResponse[]) => {
      setColumnData(columnData);
    },

    onError: (data: any) => {
      setUserError(data.response?.data?.message);
      setIsOpen(true);
    }
  } as IColumnResponse | any);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onMount = async () => {
    getColumnMutation.mutate(token);
  };

  useEffect(() => {
    onMount();
  }, []);

  return (
    // <div style={{ width: hasScroll ? '220px' : null, maxHeight: '100%' }} ref={todoWrapper}>
    // <OverlayScrollbarsComponent
    //   style={{ width: '222px', height: '222px' }}
    //   options={{
    //     scrollbars: {
    //       theme: 'os-theme-light',
    //       visibility: 'auto',
    //       autoHide: 'never'
    //     }
    //   }}
    //   defer
    // >
    <Container>
      <Grid container spacing={3} sx={{ overflow: 'scroll' }}>
        {columnData.map((data: any, index) => {
          return (
            // <Container
            //   sx={{
            //     display: 'flex',
            //     flexDirection: 'column'
            //   }}
            // >
            <Grid
              item
              xs={12}
              md={4}
              key={index}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <StyledColumn data={data} index={data._id} key={index} />
            </Grid>
            // </Container>
          );
        })}
      </Grid>

      {userError && (
        <ErrorSnackbar
          open={isOpen}
          onClose={handleClose}
          onClick={handleClose}
          errorMessage={userError}
        />
      )}
    </Container>
    // </div>
  );
};
