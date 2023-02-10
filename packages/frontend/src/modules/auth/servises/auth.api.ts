import {
  ISignUp,
  ISignIn,
  ISignInResponce,
  ISignUpResponce,
  GenericResponse,
  IUserResponse
} from './../../common/interfaces/auth.interface';
import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:4200/api'
});
authApi.defaults.headers.common['Content-Type'] = 'application/json';

// export const getUser = async ({  }) => {
//   const response = await authApi.get('/signUp');
//   return response.data;
// };

export const signIn = async (signInData: ISignIn) => {
  console.log(signInData);
  const response = await authApi.post<ISignInResponce>('/user/signIn', signInData);
  return response.data;
};

export const signUp = async (signUpData: ISignUp) => {
  console.log(signUpData);
  const response = await authApi.post<ISignUpResponce>('/user/signUp', signUpData);
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>('auth/logout');
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get<IUserResponse>('users/me');
  return response.data;
};

export default authApi;
