import {
  ISignUp,
  ISignIn,
  ISignInResponse,
  ISignUpResponse,
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

export const signInFn = async (signInData: ISignIn) => {
  const response = await authApi.post<ISignInResponse>('/user/signIn', signInData);
  return response.data;
};

export const signUpFn = async (signUpData: ISignUp) => {
  const response = await authApi.post<ISignUpResponse>('/user/signUp', signUpData);
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
