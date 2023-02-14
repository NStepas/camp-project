import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export default class AuthService {
  async bcryptPassword(userPassword: string) {
    return process.env.SALT ? await bcrypt.hash(userPassword, +process.env.SALT) : false;
  }

  async comparePassword(userPassword: string, hashedPassword: string) {
    return bcrypt.compare(userPassword, hashedPassword);
  }

  async jwtGenerator(id: ObjectId, email: string) {
    return jwt.sign(
      {
        id: id,
        email: email
      },
      process.env.JWT_SECRET
    );
  }
}
