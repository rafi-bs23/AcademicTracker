import mongoose from 'mongoose';
import app from './app';

const DB: string | undefined =
  process.env.DB_URL?.replace('<PASSWORD>', process.env.DB_PASSWORD!) || '';

console.log(DB);

mongoose
  .connect(DB)
  .then(() => console.log('Database connected successfully.'));

const port: number = Number(process.env.PORT);
app.listen(port, () => console.log(`Listening on port ${port}...`));
console.log('im the server');
