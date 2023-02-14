import { CardButtonWrraper } from './card-button.styles';

export interface IStyledButtonProps {
  variant: 'text' | 'outlined' | 'contained';
  type: 'submit' | 'reset' | 'button';
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const StyledCardButton = ({ variant, type, size, label, onClick }: IStyledButtonProps) => {
  return (
    <CardButtonWrraper variant={variant} type={type} size={size} onClick={onClick}>
      {label}
    </CardButtonWrraper>
  );
};
