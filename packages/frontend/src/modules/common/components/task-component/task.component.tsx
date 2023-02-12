import { CardContent, IconButton } from '@mui/material';
import { CardStyle, ColorMithril } from '../../constants/card.styles';
import { StyledCardInput } from '../card-input';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const TaskComponent = (props: any) => {
  return (
    <CardContent sx={CardStyle}>
      <StyledCardInput defaultValue={props.name} />
      <IconButton aria-label="delete">
        <DeleteOutlineIcon sx={ColorMithril} />
      </IconButton>
    </CardContent>
  );
};
