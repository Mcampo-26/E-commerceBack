import { Schema, model } from "mongoose";

// Esquema para el modelo de Usuario
const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  direccion1: { type: String },
  direccion2: { type: String },
  telefono: { type: String },
  role: { type: String, default: 'usuario', enum: ['usuario', 'admin'] },

  favorites: [{ type: Schema.Types.ObjectId, ref: 'Productos' }] // Campo para almacenar los IDs de los productos favoritos
});

export default model("Usuario", UsuarioSchema);
