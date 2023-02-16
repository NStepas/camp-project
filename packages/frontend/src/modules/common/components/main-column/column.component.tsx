import { useRef, useState } from 'react';

import { CardActions, CardContent, Container } from '@mui/material';
import { useFormik } from 'formik';

import { CardWrapper } from '.';
import { StyledCard } from '../card-input-create';
import { StyledColumnNameInput } from '../column-name-input';
import { CreateCard } from '../card-create';
import { useMatchMedia } from '../../../../hooks/use-match-media';
import { useScrollbar } from '../../../../hooks/use-scrollbar';
import { useUpdateColumnQuery } from '../../../../hooks/column-hooks/use-update-column';

import { validate } from '../../../auth/validation/signin-validation';
import { ButtonAtStart, HeaderColumnStyle } from '../../constants/card.styles';
import { initialColumnValue } from '../../constants/form-validation-constants';

export const StyledColumn = (props: any) => {
  const [value, setValue] = useState();
  const { isMobile } = useMatchMedia();
  const todoWrapper = useRef(null);

  const hasScroll = isMobile && props.data.cards.length > 3;
  useScrollbar(todoWrapper, hasScroll);

  const values = { name: value, columnId: props.data._id };

  const updateColumnMutation = useUpdateColumnQuery();

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
    <CardWrapper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: 'fit-content',
        height: 'fit-content'
      }}
    >
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
            <div
              style={{
                maxHeight: isMobile ? `6.5rem` : '100vh',
                padding: 'none'
              }}
              ref={todoWrapper}
            >
              {props.data.cards.map((input: any, index: number) => (
                <StyledCard {...input} key={index} />
              ))}
            </div>
          </Container>
        </CardContent>
        <CardActions disableSpacing sx={ButtonAtStart}>
          <CreateCard id={props.data._id} />
        </CardActions>
      </CardContent>
    </CardWrapper>
  );
};
