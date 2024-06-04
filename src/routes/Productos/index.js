import express from "express";
import {
  createProductos,
  getProductos,
  updateProductos,
  deleteProductosById,
  toggleOferta,
  toggleFavorite // Importa el controlador toggleFavorite
} from '../../controllers/productosControllers/index.js';

const router = express.Router();

router.post('/create', createProductos);
router.get('/get', getProductos);
router.put('/update/:id', updateProductos);
router.delete('/delete/:id', deleteProductosById);
router.put('/oferta/:id', toggleOferta);
router.put('/favorite/:id', toggleFavorite); // Define la ruta para marcar como favorito

export default router;
