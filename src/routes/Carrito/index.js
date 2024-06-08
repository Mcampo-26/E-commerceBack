import express from "express";
import { createCarrito, getCarrito, updateCarrito, deleteCarrito } from "../../controllers/carritoControllers/index.js";

const router = express.Router();

router.post('/', createCarrito);  // Ruta para crear o agregar productos al carrito
router.get('/:userId', getCarrito);  // Ruta para obtener el carrito de un usuario específico
router.put('/:id', updateCarrito);  // Ruta para actualizar un producto en el carrito
router.delete('/:userId/:productId', deleteCarrito);  // Ruta para eliminar un producto del carrito

export default router;
