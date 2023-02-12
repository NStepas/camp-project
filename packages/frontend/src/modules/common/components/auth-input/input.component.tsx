import { AuthTextFieldWrapper } from './input.styled';

export interface IStyledInputProps {
  name: string;
  label: string;
  formik?: any;
  type?: string;
}

export const StyledInput = ({ name, label, formik, type }: IStyledInputProps) => {
  return (
    <AuthTextFieldWrapper
      id={name}
      name={name}
      label={label}
      type={type}
      variant="outlined"
      autoFocus={true}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  );
};
