export interface IUserPreferences {
  emailNotifications?: boolean;
  eventReminders?: boolean;
  preferredCategory?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  about?: string;
  imageUrl?: string;
  preferences?: IUserPreferences;
}

export interface IUserWithPassword extends IUser {
  password: string;
}

export type TCreateUserPayload = Omit<IUserWithPassword, 'id'>;

export type TUpdateUserPayload = Partial<
  Pick<IUser, 'name' | 'avatar' | 'about' | 'imageUrl' | 'preferences'>
>;

export type ProfileLoaderData = { user: IUser };
