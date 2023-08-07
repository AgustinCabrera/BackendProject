import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  id:{type: String , required: true},
  quantity: {type: Number, required: true, min: 0},
});

export const CartModel = new mongoose.Schema('products', cartSchema);