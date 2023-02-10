import { TextFieldWrapper } from './input.styled';

export interface IStyledInputProps {
  name: string;
  label: string;
  formik?: any;
}

export const StyledInput = ({ name, label, formik }: IStyledInputProps) => {
  return (
    <TextFieldWrapper
      id={name}
      name={name}
      label={label}
      variant="outlined"
      autoFocus={true}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  );
};
