export interface IUserAccount {
  id?: string;
  name: string;
  surname: string;
  username: string;
  phoneNumber: string;
}
export class UserAccount implements IUserAccount {
  id?: string;
  username: string;
  phoneNumber: string;
  name: string;
  surname: string;
}
