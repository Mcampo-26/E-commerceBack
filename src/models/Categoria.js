import { Schema, model } from "mongoose";

const CategoriaSchema = new Schema({
    id: {type: String}, 
    name: {type: String, required: [true, "Nombre es requerido"]},
   
    
})

export default model ("Categoria", CategoriaSchema)