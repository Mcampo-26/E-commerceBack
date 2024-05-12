import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    name: {type: String, required: [true, "Nombre es requerido"]},
    password: {type:String, required: [true, "Password es requerido"]},
    email: {type: String,required: [true, "email es requerido"]},
    
})

export default model ("Users", usersSchema)