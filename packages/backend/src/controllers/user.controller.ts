import { AUTH_ERRORS, USER_ERROR } from './../shared/consts/error.constants';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import { errorHandler } from '../middlwares/error-handler';
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  signUp = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;

      const bcryptedPassword = await this.authService.bcryptPassword(password);
      if (!bcryptedPassword) {
        return errorHandler(StatusCodes.BAD_GATEWAY, AUTH_ERRORS.WRONG_AUTH_DATA, res);
      }

      const user = await this.userService.createUser(req.body, bcryptedPassword);

      if (!user) {
        return errorHandler(StatusCodes.BAD_GATEWAY, USER_ERROR.FAILED_TO_CREATE_USER, res);
      }
      const jwtToken = await this.authService.jwtGenerator(user._id, user.email);
      if (!jwtToken) {
        return errorHandler(StatusCodes.UNAUTHORIZED, AUTH_ERRORS.WRONG_ACCESS_TOKEN, res);
      }
      return res.json({ id: user._id, name: user.name, email: user.email, jwtToken });
    } catch (e) {
      return errorHandler(StatusCodes.BAD_REQUEST, USER_ERROR.EXISTING_NAME, res);
    }
  };

  signIn = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = await this.userService.getUserByNameOrEmail(name);
    if (!user) {
      return errorHandler(StatusCodes.BAD_REQUEST, USER_ERROR.NOT_FOUND_USER, res);
    }

    if (!(await this.authService.comparePassword(password, user.password))) {
      return errorHandler(StatusCodes.BAD_REQUEST, USER_ERROR.INVALID_PASSWORD, res);
    }
    const jwtToken = await this.authService.jwtGenerator(user._id, user.email);
    if (!jwtToken) {
      return errorHandler(StatusCodes.UNAUTHORIZED, AUTH_ERRORS.WRONG_ACCESS_TOKEN, res);
    }
    return res.json({ id: user._id, name: user.name, emai: user.email, jwtToken });
  };
}

const userController = new UserController(new UserService(), new AuthService());
export default userController;
