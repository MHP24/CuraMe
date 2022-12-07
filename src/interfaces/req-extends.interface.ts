import { Request } from 'express';
import { UserI } from './user.interface';


export interface ReqExtUserI extends Request {
  user: UserI
}