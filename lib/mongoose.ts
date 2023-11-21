import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  
  if (isConnected) 
    return console.log('Database connection is already established');

  if (!process.env.MONGODB_URI)
    return console.log('MONGODB URI is not defined');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    
    console.log('Mongodb connected');
  } catch (error) {
    console.log(error)
  }
}