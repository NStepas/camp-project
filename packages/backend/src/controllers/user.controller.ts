import { Response, Request } from 'express';

import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  signUp = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const bcryptedPassword = await this.authService.bcryptPassword(password);
      if (!bcryptedPassword) {
        //todo error
        console.log('failed to bcrept password');
      }
      const user = await this.userService.createUser(req.body, bcryptedPassword);
      const jwtToken = await this.authService.jwtGenerator(user._id, user.email);
      return res.json({ user: user, jwtToken });
    } catch (e) {
      res.send('Error!');
    }
  };

  signIn = async (req: Request, res: Response) => {
    return res.send('Signed Up!');
  };
}

const userController = new UserController(new UserService(), new AuthService());
export default userController;
