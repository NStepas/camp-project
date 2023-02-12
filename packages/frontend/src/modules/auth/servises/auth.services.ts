import { mainApi } from './../../common/services/main.services';
import {
  ISignUpUser,
  ISignInUser,
  ISignInResponse,
  ISignUpResponse
} from '../../common/types/auth.interface';

export const signInFn = async (signInData: ISignInUser) => {
  const response = await mainApi.post<ISignInResponse>('/user/signIn', signInData);
  return response.data;
};

export const signUpFn = async (signUpData: ISignUpUser) => {
  const response = await mainApi.post<ISignUpResponse>('/user/signUp', signUpData);
  return response.data;
};
