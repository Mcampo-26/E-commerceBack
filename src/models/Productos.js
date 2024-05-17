
import { Schema, model } from "mongoose";

const ProductosSchema = new Schema({
    id: { type: Number },
    name: { type: String, required: [true, "Nombre es requerido"] },
    description: { type: String, required: [true, "Descripción es requerida"] },
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
    price: { type: String, required: [true, "Precio es requerido"] },
    detalles: { type: String, required: [true, "Detalles es requerido"] },  // Corrected required message
    categoria: { type: String, required: [true, "Categoría es requerida"] }
});

export default model("Productos", ProductosSchema);
