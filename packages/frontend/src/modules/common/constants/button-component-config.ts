import { IStyledButtonProps } from '../components/button-component/button.component';

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
    label: 'LOGIN'
  }
];

export const navbarButton: IStyledButtonProps[] = [
  { variant: 'contained', type: 'submit', size: 'small', label: '{ user }' },
  {
    variant: 'contained',
    type: 'submit',
    size: 'small',
    label: 'LOGOUT'
    // onClick: onLogoutHandler()
  }
];

export const columnButton: IStyledButtonProps[] = [
  { variant: 'text', type: 'submit', size: 'large', label: '+ Add new column' }
];
export const cardButton: IStyledButtonProps[] = [
  { variant: 'text', type: 'submit', size: 'large', label: '+ Add new card' }
];
