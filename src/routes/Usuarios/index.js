import express from "express";
import { createUsuario, getUsuarios, updateUsuario, deleteUsuarioById, loginUsuario } from "../../controllers/usuariosControllers/Index.js";

const router = express.Router();

router.post('/create', createUsuario);
router.get('/get', getUsuarios);
router.put('/update/:id', updateUsuario);
router.delete('/delete/:id', deleteUsuarioById);
router.post('/login', loginUsuario);

export default router;