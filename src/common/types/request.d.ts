import { IUser } from "src/modules/user/interfaces/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}
