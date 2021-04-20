import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import logger from './logger';

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', err => {
  console.error(err); // eslint-disable-line no-console
  console.log('MongoDB connection error. Please make sure MongoDB is running.'); // eslint-disable-line no-console
  process.exit();
});

app.listen(PORT, () => {
  logger.debug(`Express server started at http://localhost:${PORT}`);
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  mongoose.connection.close();
});
