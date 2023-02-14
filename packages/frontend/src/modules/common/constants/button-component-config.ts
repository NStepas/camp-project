import { IStyledButtonProps } from '../components/button-component/button.component';
import { localStorageUserData } from '../services/main.services';

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

const localStorageData = JSON.parse(localStorageUserData);
const userName = localStorageData.name;

export const NavbarButton: IStyledButtonProps[] = [
  { variant: 'contained', type: 'submit', size: 'small', label: userName, disabled: true },
  {
    variant: 'contained',
    type: 'submit',
    size: 'small',
    label: 'LOGOUT'
  }
];

export const ColumnButton: IStyledButtonProps[] = [
  { variant: 'text', type: 'submit', size: 'small', label: '+ Add new column' }
];

export const CreateColumnButton: IStyledButtonProps[] = [
  { variant: 'contained', type: 'submit', size: 'small', label: 'Add column' }
];

export const CardButton: IStyledButtonProps[] = [
  { variant: 'text', type: 'submit', size: 'small', label: '+ Add new card' }
];

export const CreateCardButton: IStyledButtonProps[] = [
  { variant: 'contained', type: 'submit', size: 'small', label: 'Add card' }
];
