import { StatusCodes } from 'http-status-codes';
import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import passport from 'passport';

import AppRouter from './routes';
import connectDB from './config/database';
import { errorHandler } from './middlwares/error-handler';

import { jwtStrategy, anonymousStrategy } from './middlwares/passport.middleware';

const app = express();

app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(anonymousStrategy);

const router = new AppRouter(app);

// Express configuration
app.set('port', process.env.PORT || 4200);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

app.use((_req, _res) => {
  errorHandler(StatusCodes.NOT_FOUND, 'Not found', _res);
});

const port = app.get('port');

const server = app.listen(port, async () => {
  await connectDB();
  console.log(`Server started on port ${port}`);
});

export default server;
