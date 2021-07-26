/**
 * Everything not related to express will goes here
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });
import { app } from './app.js';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successful!'));

const PORT = process.env.PORT || 3000;

// console.log('ENV', app.get('env'));
console.log('ENV', process.env.NODE_ENV); // SET NODE_ENV=development

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
