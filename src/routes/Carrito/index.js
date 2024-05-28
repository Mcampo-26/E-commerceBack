import express from "express";
import { createCarrito, getCarrito, updateCarrito, deleteCarritoById } from "../../controllers/carritoControllers/index.js";

const router = express.Router()

router.post('/create', createCarrito)
router.get('/get', getCarrito)
router.put('/update/:id', updateCarrito)
router.delete('/delete/:id', deleteCarritoById)

export default router