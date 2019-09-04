export interface IAuthModel {
  email: string;
  password: string;
}
export class LoginModel implements IAuthModel {
  email: string;
  password: string;
}
