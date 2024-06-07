import Usuario from '../../models/Usuario.js';
import bcrypt from 'bcrypt';


export const loginUsuario = async (req, res) => {
    console.log("Datos recibidos:", req.body);
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
     

        if (usuario && await bcrypt.compare(password, usuario.password)) {
            console.log("Contraseña correcta");
            res.json({ message: "Login exitoso", usuario }); // Asegúrate de incluir usuario aquí
        } else {
          
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error("Error durante el login:", error);
        res.status(500).send(error.message);
    }
}
;
export const logoutUsuario = async (req, res) => {
  try {
    // Puedes incluir cualquier lógica adicional aquí, como limpiar la sesión del usuario
    res.clearCookie('tu_cookie_de_sesion'); // Ejemplo de cómo limpiar una cookie de sesión
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al cerrar la sesión' });
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



export const addToFavorites = async (req, res) => {
  try {
      const { userId, productId } = req.body;
      const usuario = await Usuario.findById(userId);

      if (!usuario) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Agregar el ID del producto a la lista de favoritos del usuario
      usuario.favorites.push(productId);
      await usuario.save();

      res.status(200).json({ message: 'Producto agregado a favoritos correctamente', usuario });
  } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al agregar el producto a favoritos' });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
      const { userId, productId } = req.body;
      const usuario = await Usuario.findById(userId);

      if (!usuario) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Remover el ID del producto de la lista de favoritos del usuario
      usuario.favorites = usuario.favorites.filter(favoriteId => favoriteId !== productId);
      await usuario.save();

      res.status(200).json({ message: 'Producto eliminado de favoritos correctamente', usuario });
  } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al eliminar el producto de favoritos' });
  }
};