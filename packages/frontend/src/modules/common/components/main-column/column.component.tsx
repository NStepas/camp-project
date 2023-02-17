import React from 'react';
import { useRef, useState } from 'react';

import { CardActions, CardContent, Container } from '@mui/material';
import { useFormik } from 'formik';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../../../helpers/strict-mode-droppable';

import { CardWrapper } from '.';
import { StyledCard } from '../card-input-create';
import { StyledColumnNameInput } from '../column-name-input';
import { CreateCard } from '../card-create';
import { useMatchMedia } from '../../../../hooks/use-match-media';
import { useUpdateColumnQuery } from '../../../../hooks/column-hooks/use-update-column';

import { validate } from '../../../auth/validation/signin-validation';
import { ButtonAtStart, HeaderColumnStyle } from '../../constants/card.styles';
import { initialColumnValue } from '../../constants/form-validation-constants';

export const StyledColumn = React.forwardRef(({ data, ...rest }: any, ref: any) => {
  const [value, setValue] = useState();

  const { isMobile } = useMatchMedia();

  const hasScroll = isMobile && data.cards.length > 3;

  const values = { name: value, columnId: data._id };

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
      id={data._id}
      ref={ref}
      {...rest}
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
                name={data.columnName}
                defaultValue={data.columnName}
                onKeyPress={handleKeySubmit as any}
              />
            </form>
          </Container>
          <Droppable droppableId="card" key="card" direction="vertical">
            {(provided) => (
              <Container
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0',
                  paddingRight: '0.2rem'
                }}
              >
                <div
                  style={{
                    maxHeight: isMobile ? `6.5rem` : '100vh',
                    padding: 'none',
                    overflowX: hasScroll ? 'auto' : null
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {data.cards.map((input: any, index: number) => (
                    <Draggable key={input._id} draggableId={input._id} index={index}>
                      {(provided) => (
                        <StyledCard
                          id={input._id}
                          cardName={input.cardName}
                          {...input}
                          key={index}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </Container>
            )}
          </Droppable>
        </CardContent>
        <CardActions disableSpacing sx={ButtonAtStart}>
          <CreateCard id={data._id} />
        </CardActions>
      </CardContent>
    </CardWrapper>
  );
});
