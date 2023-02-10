import { ReactEventHandler } from 'react';
import { ButtonWrraper } from './button.styles';

export interface IStyledButtonProps {
  variant: any;
  type: any;
  size?: any;
  label: string;
  onClick?: any;
}

export const StyledButton = ({ variant, type, size, label, onClick }: IStyledButtonProps) => {
  return (
    <ButtonWrraper variant={variant} type={type} size={size}>
      {label}
    </ButtonWrraper>
  );
};
