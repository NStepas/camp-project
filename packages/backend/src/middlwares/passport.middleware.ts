import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';

import { User } from '../models/User';

interface JWTPayload {
  id: string;
}
export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'SUPER_SECRET_KEY'
  },
  async (payload: JWTPayload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) return done(null, false);
      done(null, user.toJSON());
    } catch (e) {
      return done(e);
    }
  }
);

export const anonymousStrategy = new AnonymousStrategy();
