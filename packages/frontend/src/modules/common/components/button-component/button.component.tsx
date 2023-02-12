import { ButtonWrraper } from './button.styles';

export interface IStyledButtonProps {
  variant: any;
  type: any;
  size?: any;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const StyledButton = ({ variant, type, size, label }: IStyledButtonProps) => {
  return (
    <ButtonWrraper variant={variant} type={type} size={size}>
      {label}
    </ButtonWrraper>
  );
};
