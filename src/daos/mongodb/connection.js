import mongoose from 'mongoose';

const connectString = 'mongodb://127.0.0.1:27017/ecommerce';

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectString);
    console.log("Connection to Mongo succesfully");
  } catch (error) {
  console.log(error);    
  }
}

