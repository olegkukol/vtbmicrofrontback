declare namespace Express {
  export interface Response {
    pagination?: {
      limit: number;
      skip: number;
      total: number;
      page: number;
    };
  }
}
