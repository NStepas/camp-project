import { StyledColumn } from '../../common/components/main-column';
import { useFormik } from 'formik';
import { initialColumnValue } from '../../common/constants/form-validation-constants';
import { validate } from '../validation/column-validation';
import { useMutation } from 'react-query';

import { COLUMN_QUERY_KEY } from '../../common/constants/app-keys.const';
import { useState } from 'react';
import { IColumnResponse, IColumnUpdate } from '../../common/types/column.interface';
import { Container } from '@mui/system';
import { ErrorSnackbar } from '../../common/components/error-snackbar/error-snackbar.component';
import { getColumnFn, updateColumnFn } from '../services/column.services';
import { useEffect } from 'react';
import { localStorageUserData } from '../../common/services/main.services';
import { Grid } from '@mui/material';

export const MainColumn = () => {
  const [userError, setUserError] = useState('');
  const [columnData, setColumnData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const localStorageData = JSON.parse(localStorageUserData);
  const token = localStorageData.token;

  const getColumnMutation = useMutation(COLUMN_QUERY_KEY, (token: string) => getColumnFn(token), {
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

  useEffect(() => {
    getColumnMutation.mutate(token);
  }, []);

  return (
    <Container>
      {/* <StyledColumn />; */}
      {/* <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'row' }}> */}
      {columnData.map((data: any) => {
        return (
          <Grid item>
            <StyledColumn data={data} index={data._id} />
          </Grid>
        );
      })}
      {/* </form> */}
      {userError && (
        <ErrorSnackbar
          open={isOpen}
          onClose={handleClose}
          onClick={handleClose}
          errorMessage={userError}
        />
      )}
    </Container>
  );
};
