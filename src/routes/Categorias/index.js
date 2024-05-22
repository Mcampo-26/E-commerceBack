import express from "express";
import { createCategoria, getCategorias,updateCategoria, deleteCategoriaById } from '../../controllers/categoriaControllers/index.js'

const router = express.Router()

router.post('/create', createCategoria)
router.get('/get', getCategorias)
router.put('/update/:id', updateCategoria)
router.delete('/delete/:id', deleteCategoriaById)

export default router