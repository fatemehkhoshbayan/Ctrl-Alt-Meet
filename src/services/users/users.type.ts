export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface IUserWithPassword extends IUser {
  password: string;
}

export type TCreateUserPayload = Omit<IUserWithPassword, 'id'>;
