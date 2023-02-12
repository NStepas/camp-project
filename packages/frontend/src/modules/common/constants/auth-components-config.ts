import { IStyledInputProps } from '../../common/components/auth-input/input.component';

export const SignInComponentsConfig: IStyledInputProps[] = [
  {
    name: 'name',
    label: 'Name/Email'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password'
  }
];

export const SignUpComponentsConfig: IStyledInputProps[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email'
  }
];
