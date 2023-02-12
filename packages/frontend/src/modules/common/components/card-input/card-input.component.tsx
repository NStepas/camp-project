import { CardTextFieldWrapper } from './card-input.styles';

export interface IStyledInputProps {
  defaultValue: string;
}

export const StyledCardInput = ({ defaultValue }: IStyledInputProps | any) => {
  return <CardTextFieldWrapper id="outlined" defaultValue={defaultValue} />;
};
