import mongoose from 'mongoose';

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err);
  console.log('UNCAUGHT EXCEPTOIN SHUTTING DOWN THE PROCESS...');
  process.exit(1);
});

import app from './app';

const DB: string | undefined =
  process.env.DB_URL?.replace('<PASSWORD>', process.env.DB_PASSWORD!) || '';

console.log(DB);

mongoose
  .connect(DB)
  .then(() => console.log('Database connected successfully.'));

const port: number = Number(process.env.PORT);
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION. SHUTTING DOWN THE PROCESS...');
  server.close(() => {
    process.exit(1);
  });
});

console.log('im the server');
console.log(process.env.NODE_ENV);
