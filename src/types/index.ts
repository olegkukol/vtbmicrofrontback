declare module 'express-session' {
  interface Session {
    IsAuthenticated: boolean;
    userId: string;
  }
}
