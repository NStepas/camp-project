import axios from 'axios';
import { ISignIn, ISignUp } from '../../shared/interfaces/auth.interface';

const authApi = axios.create({
  baseURL: 'http://localhost:3000'
});

export const signIn = async (signInData: ISignIn) => {
  console.log(signInData);
  return authApi.post('/signIn', signInData);
};

export const signUp = async (signUpData: ISignUp) => {
  console.log(signUpData);
  return authApi.post('/signUp', signUpData);
};

export default authApi;
