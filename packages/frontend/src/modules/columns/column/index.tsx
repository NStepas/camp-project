import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../../helpers/strict-mode-droppable';

import { StyledColumn } from '../../common/components/main-column';

import { useGetColumnQuery } from '../../../hooks/column-hooks/use-get-column';
import { useMatchMedia } from '../../../hooks/use-match-media';
import { useDNDColumnQuery } from '../../../hooks/column-hooks/use-dnd-update';

export const MainColumn = () => {
  const { isMobile } = useMatchMedia();

  const { data: columnData, isSuccess } = useGetColumnQuery() as any;

  const DNDColumnMutation = useDNDColumnQuery();

  var handleDND = async (value: any) => {
    DNDColumnMutation.mutate(value as any);
  };

  return (
    <Container>
      <DragDropContext onDragEnd={handleDND}>
        {isSuccess && (
          <Droppable
            droppableId="column"
            key="column"
            direction={isMobile ? 'vertical' : 'horizontal'}
          >
            {(provided) => (
              <Grid
                {...provided.droppableProps}
                ref={provided.innerRef}
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
                {columnData.map((data: any, index: number) => {
                  return (
                    <Draggable key={data._id} draggableId={data._id} index={index}>
                      {(provided) => (
                        <StyledColumn
                          data={data}
                          index={data._id}
                          key={index}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        />
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </Container>
  );
};
