import { Application } from 'express';

import userRouter from './api/user.route';
import columnRouter from './api/column.route';
import cardRouter from './api/card.route';
class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/user', userRouter);
    this.app.use('/api/column', columnRouter);
    this.app.use('/api/card', cardRouter);
  }
}

export default AppRouter;
