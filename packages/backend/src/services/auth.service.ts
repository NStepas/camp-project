import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export default class AuthService {
  async bcryptPassword(userPassword: string) {
    return bcrypt.hash(userPassword, 12);
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
      'SUPER_SECRET_KEY'
    );
  }
}
