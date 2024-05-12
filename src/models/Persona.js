import { Schema, model } from "mongoose";

const PersonaSchema = new Schema({
    id: {type: Number},
    name: {type: String, required: [true, "Nombre es requerido"]},
    rol: {type:String, required: [true, "description es requerido"]},

    
    
})

export default model ("Persona", PersonaSchema)