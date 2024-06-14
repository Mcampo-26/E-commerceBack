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
    const { page = 1, limit = 10 } = req.query; // Desestructura los parámetros de consulta
    const categorias = await Categoria.find()
      .skip((page - 1) * limit) // Salta los documentos anteriores según la página y el límite
      .limit(Number(limit)); // Limita el número de documentos devueltos según el límite

    const total = await Categoria.countDocuments(); // Cuenta el número total de documentos

    console.log('Categorías obtenidas del servidor:', categorias);

    res.status(200).json({
      categorias,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
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