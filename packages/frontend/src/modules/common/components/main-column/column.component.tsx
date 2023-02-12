import { CardActions, CardContent, IconButton, TextField, Container } from '@mui/material';
import { CardWrapper } from '.';
import { cardButton } from '../../constants/button-component-config';
import { StyledCardButton } from '../card-button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ButtonAtStart, ColorMithril, HeaderColumnStyle } from '../../constants/card.styles';
import { TaskComponent } from '../task-component';
import { IColumnResponse } from '../../types/column.interface';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { updateColumnFn } from '../../../columns/services/column.services';
import { COLUMN_QUERY_KEY } from '../../constants/app-keys.const';
import { useFormik } from 'formik';
import { initialColumnValue } from '../../constants/form-validation-constants';
import { validate } from '../../../auth/validation/signin-validation';
import { ErrorSnackbar } from '../error-snackbar/error-snackbar.component';
import { StyledCardInput } from '../card-input';

export const StyledColumn = (props: any) => {
  const [userError, setUserError] = useState('');
  const [columnData, setColumnData] = useState([]);

  const updateColumnMutation = useMutation(
    COLUMN_QUERY_KEY,
    (value) => updateColumnFn(value as any),
    {
      COLUMN_QUERY_KEY,
      onSuccess: async (columnData: IColumnResponse[]) => {
        setColumnData(columnData);
      },

      onError: (data: any) => {
        setUserError(data.response?.data?.message);
      }
    } as IColumnResponse | any
  );

  const handleSubmit = async (value: any) => {
    console.log(value);

    updateColumnMutation.mutate(value);
  };
  const handleKeySubmit = (e: any, value: any) => {
    if (e.key === 'Enter') {
      return handleSubmit(value);
    }
  };
  const formik = useFormik({
    initialValues: initialColumnValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      onKeyDown={handleKeySubmit as any}
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <CardWrapper sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardContent sx={{ padding: '0' }}>
          <CardContent sx={HeaderColumnStyle}>
            <TextField
              sx={{ color: 'black' }}
              helperText={props.data.columnName}
              onKeyPress={handleKeySubmit as any}
            >
              {props.data.columnName}
            </TextField>
            <StyledCardInput defaultValue={props.data.columnName} onKeyPress={handleKeySubmit} />
            <IconButton aria-label="delete">
              <DeleteOutlineIcon sx={ColorMithril} />
            </IconButton>
          </CardContent>
          {props.data.card && <TaskComponent cardData={props.data.columnName} />}
          <CardActions disableSpacing sx={ButtonAtStart}>
            {cardButton.map((input, index) => (
              <StyledCardButton {...input} key={index}></StyledCardButton>
            ))}
          </CardActions>
        </CardContent>
      </CardWrapper>
    </form>
  );
};
