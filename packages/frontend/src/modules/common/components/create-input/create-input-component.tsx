import { CreateTextFieldWrapper } from '.';

export interface IStyledInputProps {
  id: string;
  name: string;
  formik?: any;
  type?: React.HTMLInputTypeAttribute;
}

export const CreateInputComponent = ({ id, name, formik, type }: IStyledInputProps) => {
  return (
    <CreateTextFieldWrapper
      fullWidth
      id={id}
      name={name}
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
