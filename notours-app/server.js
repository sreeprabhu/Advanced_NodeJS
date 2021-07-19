/**
 * Everything not related to express will goes here
 */
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import { app } from './app.js';

const PORT = process.env.PORT || 3000;

console.log('ENV', app.get('env'));
// console.log('ENV', process.env); // SET NODE_ENV=development

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
