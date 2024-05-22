import Categoria from "../../models/Categoria.js";

// Controlador para crear una categoría
export const createCategoria = async (req, res) => {
  try {
    const { idCategoria, name } = req.body; // Desestructura los datos del cuerpo de la solicitud
    const categoria = new Categoria({ idCategoria, name }); // Crea una nueva instancia del modelo de categorías
    await categoria.save(); // Guarda la nueva categoría en la base de datos
    res.status(200).send("Categoría creada exitosamente");
  } catch (error) {
    res.status(400).send(error.message); // Maneja los errores
  }
};
// Controlador para obtener todas las categorías
export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find(); // Busca todas las categorías en la base de datos
    res.status(200).json(categorias);
    console.log(categorias); // Envía las categorías como respuesta
  } catch (error) {
    res.status(400).send(error.message); // Maneja los errores
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Encuentra la categoría por ID y actualiza el nombre
    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).send("Categoría no encontrada");
    }

    res.status(200).send("Categoría actualizada exitosamente");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await Categoria.findByIdAndDelete(id);
    if (!deleteResult) {
      return res.status(404).json({ error: 'No se pudo encontrar el producto con el ID proporcionado' });
    }
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el producto' });
  }
};
