import Usuario from '../../models/Usuario.js';

// Controlador para crear un usuario
export const createUsuario = async (req, res) => {
  try {
    const { nombre, email, password, direccion, telefono } = req.body; // Desestructura los datos del cuerpo de la solicitud
    const usuario = new Usuario({ nombre, email, password, direccion, telefono}); // Crea una nueva instancia del modelo de usuario
    await usuario.save(); // Guarda el nuevo usuario en la base de datos
    res.status(201).json({ message: "Usuario creado exitosamente", usuario });
  } catch (error) {
    res.status(400).send(error.message); // Maneja los errores
  }
};

// Controlador para obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Busca todos los usuarios en la base de datos
    res.status(200).json(usuarios); // Envía los usuarios como respuesta
  } catch (error) {
    res.status(400).send(error.message); // Maneja los errores
  }
};

// Controlador para actualizar un usuario por ID
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, direccion, telefono, role } = req.body;

    // Encuentra el usuario por ID y actualiza los campos
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, email, password, direccion, telefono, role },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.status(200).json({ message: "Usuario actualizado exitosamente", usuario: usuarioActualizado });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Controlador para eliminar un usuario por ID
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
