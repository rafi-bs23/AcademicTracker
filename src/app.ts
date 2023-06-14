import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
const app = express();

app.use(morgan('dev'));
app.use(express.json());

export default app;
