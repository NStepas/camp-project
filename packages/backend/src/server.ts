import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';

import connectDB from './config/database';
import AppRouter from './routes';
import { StatusCodes } from 'http-status-codes';
import { errorHandler } from './middlwares/error-handler';
import { jwtStrategy, anonymousStrategy } from './middlwares/passport.middleware';
import { SERVER_ERROR } from './shared/consts/error.constants';

const app = express();

app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(anonymousStrategy);

const router = new AppRouter(app);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

app.use((_req, _res) => {
  errorHandler(StatusCodes.NOT_FOUND, SERVER_ERROR.NOT_FOUND, _res);
});

const PORT = process.env.PORT;

export const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started on port ${PORT}`);
});
