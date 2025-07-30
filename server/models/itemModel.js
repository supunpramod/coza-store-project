import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });

const Item = mongoose.model('Item', shopSchema);
export default Item;
