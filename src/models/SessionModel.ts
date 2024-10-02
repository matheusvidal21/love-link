import UserModel from './UserModel';

export default interface Session {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: UserModel;
  }
  