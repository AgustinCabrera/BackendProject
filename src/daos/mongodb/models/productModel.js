import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema({
  name: {type: String , required: true},
  description:{type: String},
  price: {type: Number , required: true},
  category: {type: String , required: true},
  stock: {type: Number , required: true},
  thumbnail: {type: String , required: true},
  status: {type: Boolean , required: true},
});

export const ProductModel = new mongoose.model('products', prodSchema);