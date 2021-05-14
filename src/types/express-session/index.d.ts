import session from 'express-session';

declare module 'express-session' {
  export interface Session {
    userId: string;
    isLogged: boolean;
    user: {
      teamId: string;
      streamId: string;
      role: 'HEAD_OF_DEPARTMENT' | 'HEAD_OF_STREAM' | 'HEAD_OF_TEAM' | 'EMPLOYEE';
      type: 'INTERNAL' | 'OUTSTAFF';
      id: string;
    };
  }
}
