import express from "express";
import { createCategoria, getCategorias, updateCategoria, deleteCategoriaById, getAllCategorias } from '../../controllers/categoriaControllers/index.js'

const router = express.Router();

router.post('/create', createCategoria);
router.get('/get', getCategorias);
router.get('/all', getAllCategorias); // Nueva ruta para obtener todas las categorías sin paginación
router.put('/update/:id', updateCategoria);
router.delete('/delete/:id', deleteCategoriaById);

export default router;
