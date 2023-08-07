import mongoose from 'mongoose';

const connectString = 'mongodb://localhost:27017/ecommerce';

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectString);
    console.log("Connected to Mongo");
  } catch (error) {
  console.log(error);    
  }
}

