import { CardButtonWrraper } from './card-button.styles';

export interface IStyledButtonProps {
  variant: any;
  type: any;
  size?: any;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const StyledCardButton = ({ variant, type, size, label }: IStyledButtonProps) => {
  return (
    <CardButtonWrraper variant={variant} type={type} size={size}>
      {label}
    </CardButtonWrraper>
  );
};
