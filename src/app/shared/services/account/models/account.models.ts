export interface IUserAccount {
  id?: string;
  name: string;
  surname: string;
  username: string;
  phoneNumber: string;
  permissions: string[];
}
export class UserAccount implements IUserAccount {
  permissions: string[];
  id?: string;
  username: string;
  phoneNumber: string;
  name: string;
  surname: string;
}
