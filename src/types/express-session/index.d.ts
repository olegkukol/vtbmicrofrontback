import session from 'express-session';
import Employee from '../../models/Employee';

declare module 'express-session' {
  export interface Session {
    userId: string;
    isLogged: boolean;
    user: Employee;
  }
}
