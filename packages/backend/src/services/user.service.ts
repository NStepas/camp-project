import { User } from './../models/User';
export default class UserService {
  async findAll() {
    return 'Users';
  }

  // todo create normal interface

  async createUser(
    payload: { name: string; password: string; email: string },
    bcryptedPassword: string
  ) {
    const user = new User();
    Object.assign(user, payload);
    user.password = bcryptedPassword;
    return user.save();
  }

  async getUserByNameOrEmail(userData: string) {
    if (userData.includes('@')) {
      return User.findOne({ email: userData });
    }
    return User.findOne({ name: userData });
  }
}
