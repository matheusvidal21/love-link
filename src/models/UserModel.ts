import SessionModel from './SessionModel';
import AccountModel from './AccountModel';
import PageModel from './PageModel';

export default interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    accounts: AccountModel[];
    sessions: SessionModel[];
    pages: PageModel[];
  }