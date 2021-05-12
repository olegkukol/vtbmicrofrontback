import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import routes from './routes';

const RedisStore = connectRedis(session);

const app = express();

const REDIS_PORT = 6379;

const redisClient = redis.createClient({
  host: 'localhost',
  port: REDIS_PORT
});

redisClient.on('error', () => {
  console.log('Could not establish a connection with redis. '); // eslint-disable-line no-console
});

redisClient.on('connect', () => {
  console.log('Connected to redis successfully'); // eslint-disable-line no-console
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
  })
);

app.use(cookieParser());

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

export default app;
