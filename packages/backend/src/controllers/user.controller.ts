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
        return errorHandler(
          StatusCodes.BAD_GATEWAY,
          'Failed to bcrypt password, please try again later',
          res
        );
      }
      const user = await this.userService.createUser(req.body, bcryptedPassword);
      console.log(user);

      if (!user) {
        return errorHandler(
          StatusCodes.BAD_GATEWAY,
          'Failed to create user, please try again later',
          res
        );
      }
      const jwtToken = await this.authService.jwtGenerator(user._id, user.email);
      if (!jwtToken) {
        return errorHandler(StatusCodes.UNAUTHORIZED, 'Cannot provide access token', res);
      }
      return res.json({ id: user._id, name: user.name, emai: user.email, jwtToken });
    } catch (e) {
      res.send('Error!');
    }
  };

  signIn = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = await this.userService.getUserByNameOrEmail(name);
    if (!user) {
      return errorHandler(StatusCodes.BAD_REQUEST, "User don't exist", res);
    }

    if (!(await this.authService.comparePassword(password, user.password))) {
      return errorHandler(
        StatusCodes.BAD_REQUEST,
        'Failed to login! Inalid name/email or password',
        res
      );
    }
    const jwtToken = await this.authService.jwtGenerator(user._id, user.email);
    if (!jwtToken) {
      return errorHandler(StatusCodes.UNAUTHORIZED, 'Cannot provide access token', res);
    }
    return res.json({ id: user._id, name: user.name, emai: user.email, jwtToken });
  };
}

const userController = new UserController(new UserService(), new AuthService());
export default userController;
