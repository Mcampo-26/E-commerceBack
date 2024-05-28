import { Schema, model } from "mongoose";

const CarritoSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Productos', required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const Carrito = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [CarritoSchema],
  total: { type: Number, required: true, default: 0 }
});

export default model("Carrito", CarritoSchema);
