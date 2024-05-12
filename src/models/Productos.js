import { Schema, model } from "mongoose";

const ProductosSchema = new Schema({
    id: {type: Number},
    name: {type: String, required: [true, "Nombre es requerido"]},
    description: {type:String, required: [true, "description es requerido"]},
   image: {type: String},
   price: {type: String},
      categoria: {type: String}
    
})

export default model ("Productos", ProductosSchema)