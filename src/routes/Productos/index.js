import express from "express";
import { createProductos,getProductos, updateProductos,deleteProductosById } from '../../controllers/productosControllers/index.js'

const router = express.Router()

router.post('/create', createProductos)
router.get('/get', getProductos)
router.put('/update/:id', updateProductos)
router.delete('/delete/:id', deleteProductosById)



export default router