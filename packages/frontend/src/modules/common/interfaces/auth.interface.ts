export interface ISignIn {
  name: string;
  password: string;
}

export interface ISignUp {
  name: string;
  email: string;
  password: string;
}

export interface ISignInResponce {
  data: { email: string; name: string };
  jwtToken: string;
  message?: string;
  status?: string;
}

export interface ISignUpResponce {
  data: { email: string; name: string };
  jwtToken: string;
  message?: string;
  status?: string;
}
export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}
