import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: object; // Modify this based on the actual user object type
    }
  }
}
