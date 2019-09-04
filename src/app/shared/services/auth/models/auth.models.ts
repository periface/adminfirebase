export interface AuthModel {
  email: string;
  password: string;
}
export class LoginModel implements AuthModel {
  email: string;
  password: string;
}
