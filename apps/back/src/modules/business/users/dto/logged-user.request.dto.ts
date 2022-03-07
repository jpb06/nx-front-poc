import { JwtPayload } from '../types/jwt-payload.type';

export interface LoggedUserRequest extends Request {
  loggedUser: JwtPayload;
}
