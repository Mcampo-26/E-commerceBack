import { Schema, model } from "mongoose";

const CarritoItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Productos', required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const CarritoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CarritoItemSchema],
  total: { type: Number, required: true, default: 0 }
});
export default model("Carrito", CarritoSchema);
