import { IStyledButtonProps } from './button.component';

export const SignUpButton: IStyledButtonProps[] = [
  {
    variant: 'contained',
    type: 'submit',
    size: 'small',
    label: 'CREATE ACCOUNT'
  }
];
export const SignInButton: IStyledButtonProps[] = [
  {
    variant: 'contained',
    type: 'submit',
    size: 'small',
    label: 'SIGN IN'
  }
];

export const navbarButton: IStyledButtonProps[] = [
  { variant: 'contained', type: 'submit', size: 'small', label: '{ user }' },
  {
    variant: 'contained',
    type: 'submit',
    size: 'small',
    label: 'LOGOUT',
    onClick: 'onLogoutHandler'
  }
];
