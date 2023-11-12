import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import { errorHandler } from './middlewares/errorHandler.js'


const app = express();
app.use(morgan('dev'));
dotenv.config();


const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTIONSTRING);
    console.log('Connected database');
  }
  catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});


app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRoute);

app.use(errorHandler.active);


app.listen(process.env.APP_PORT, () => {
  connectDatabase();
  console.log('Connected to backend');
});
