export type UserTokenDto = {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
};
