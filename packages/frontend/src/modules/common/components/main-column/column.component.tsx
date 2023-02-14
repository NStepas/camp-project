import { useState } from 'react';
import { useMutation } from 'react-query';

import { CardActions, CardContent, Container } from '@mui/material';
import { useFormik } from 'formik';

import { CardWrapper } from '.';
import { IColumnResponse, IColumnUpdate } from '../../types/column.interface';
import { updateColumnFn } from '../../../columns/services/column.services';
import { StyledCard } from '../card-input-create';
import { StyledColumnNameInput } from '../column-name-input';
import { CreateCard } from '../card-create';

import { validate } from '../../../auth/validation/signin-validation';
import { COLUMN_QUERY_KEY } from '../../constants/app-keys.const';
import { ButtonAtStart, HeaderColumnStyle } from '../../constants/card.styles';
import { initialColumnValue } from '../../constants/form-validation-constants';

export const StyledColumn = (props: any) => {
  const [userError, setUserError] = useState('');
  const [columnData, setColumnData] = useState([]);
  const [value, setValue] = useState();

  const values = { name: value, columnId: props.data._id };

  const updateColumnMutation = useMutation(
    COLUMN_QUERY_KEY,
    (values: IColumnUpdate) => updateColumnFn(values as any),
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

  const handleSubmit = async () => {
    updateColumnMutation.mutate(values as any);
  };

  const handleKeySubmit = (e: any) => {
    if (e.key === 'Enter') {
      return handleSubmit();
    }
  };

  const handleChange = (values: any) => {
    setTimeout(() => {
      setValue(values.target.value);
    }, 500);
  };

  const formik = useFormik({
    initialValues: initialColumnValue,
    validationSchema: validate,
    onSubmit: handleSubmit
  });

  return (
    <CardWrapper sx={{ display: 'flex', justifyContent: 'center', width: 'fit-content' }}>
      <CardContent sx={{ padding: '0' }}>
        <CardContent sx={HeaderColumnStyle}>
          <Container sx={{ display: 'flex', flexDirection: 'row', padding: '0' }}>
            <form
              onSubmit={formik.handleSubmit}
              onChange={handleChange}
              onKeyDown={handleKeySubmit}
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <StyledColumnNameInput
                name={props.data.columnName}
                defaultValue={props.data.columnName}
                onKeyPress={handleKeySubmit as any}
              />
            </form>
          </Container>
          <Container
            sx={{ display: 'flex', flexDirection: 'column', margin: '0', paddingRight: '0.2rem' }}
          >
            {props.data.cards.map((input: any, index: number) => (
              <StyledCard {...input} key={index} />
            ))}
          </Container>
        </CardContent>
        <CardActions disableSpacing sx={ButtonAtStart}>
          <CreateCard id={props.data._id} />
        </CardActions>
      </CardContent>
    </CardWrapper>
  );
};
