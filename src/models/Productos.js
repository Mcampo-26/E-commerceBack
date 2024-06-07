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
    detalles: { type: String, required: [true, "Detalles es requerido"] },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria'},
    isOferta: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
    descuentoPorcentaje: { type: Number, default: 0 }
});

export default model("Productos", ProductosSchema);
