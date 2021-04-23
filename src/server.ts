import dotenv from 'dotenv';
import app from './app';
import logger from './logger';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.debug(`Express server started at http://localhost:${PORT}`);
});
