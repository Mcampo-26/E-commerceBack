import Usuario from '../../models/Usuario.js';
import bcrypt from 'bcrypt';






export const loginUsuario = async (req, res) => {
  console.log("Datos recibidos:", req.body);
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    console.log("Usuario encontrado:", usuario);

    if (usuario && await bcrypt.compare(password, usuario.password)) {
      console.log("Contraseña correcta");
      res.json({ message: "Login exitoso" });
    } else {
      console.log("Contraseña incorrecta");
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error durante el login:", error);
    res.status(500).send(error.message);
  }
};





export const createUsuario = async (req, res) => {
  try {
    const { nombre, email, password, direccion1, direccion2, telefono } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ nombre, email, password: hashedPassword, direccion1, direccion2, telefono });
    await usuario.save();
    res.status(201).json({ message: "Usuario creado exitosamente", usuario });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, direccion, telefono, role } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, { nombre, email, password, direccion, telefono, role }, { new: true });

    if (!usuarioActualizado) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.status(200).json({ message: "Usuario actualizado exitosamente", usuario: usuarioActualizado });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await Usuario.findByIdAndDelete(id);
    if (!deleteResult) {
      return res.status(404).json({ error: 'No se pudo encontrar el usuario con el ID proporcionado' });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al eliminar el usuario' });
  }
};