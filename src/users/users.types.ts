export type BaseUser = {
  name: string;
  password: string;
};

export type NewUser = BaseUser;

export type ExistingUser = BaseUser & {
  id: string;
};
