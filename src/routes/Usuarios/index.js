import express from "express";
import { createUsuario, getUsuarios, updateUsuario, deleteUsuarioById } from "../../controllers/usuariosControllers/Index.js";


const router = express.Router();

router.post('/create', createUsuario);  // Ruta para crear un usuario
router.get('/get', getUsuarios);        // Ruta para obtener todos los usuarios
router.put('/update/:id', updateUsuario); // Ruta para actualizar un usuario por ID
router.delete('/delete/:id', deleteUsuarioById); // Ruta para eliminar un usuario por ID

export default router;
