import { ButtonWrraper } from './button.styles';

export interface IStyledButtonProps {
  variant: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  type: 'submit' | 'reset' | 'button';
  size?: 'small' | 'medium' | 'large';
  label: string;
  sx?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const StyledButton = ({
  variant,
  type,
  size,
  label,
  onClick,
  disabled,
  sx
}: IStyledButtonProps) => {
  return (
    <ButtonWrraper
      variant={variant}
      type={type}
      size={size}
      onClick={onClick}
      disabled={disabled}
      sx={sx}
    >
      {label}
    </ButtonWrraper>
  );
};
