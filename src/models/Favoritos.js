// src/models/Favoritos.js
import mongoose from 'mongoose';

const FavoritosSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Productos', required: true }
});

export default mongoose.model('Favoritos', FavoritosSchema);
