export interface ICreateUser {
  payload: { name: string; password: string; email: string };
  bcryptedPassword: string;
}
export interface IUserData {
  userData: string;
}
