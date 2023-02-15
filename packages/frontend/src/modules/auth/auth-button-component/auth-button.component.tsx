import { ButtonWrraper } from './auth-button.styles';

export interface IStyledButtonProps {
  variant: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  type: 'submit' | 'reset' | 'button';
  size?: 'small' | 'medium' | 'large';
  label: string;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const AuthStyledButton = ({
  variant,
  type,
  size,
  label,
  onClick,
  disabled
}: IStyledButtonProps) => {
  return (
    <ButtonWrraper variant={variant} type={type} size={size} onClick={onClick} disabled={disabled}>
      {label}
    </ButtonWrraper>
  );
};
