import Productos from "../../models/Productos.js";
import mongoose from "mongoose";


export const createProductos= async (req, res)=>{
  try {
    const { id,name, description,image1,image2,image3,image4,price, categoria } = req.body;
    const nuevoProducto = new Productos({ id,name, description,image1,image2,image3,image4,price, categoria });
    await nuevoProducto.save();
    res.status(200).send("Productos creado");
  } catch (error) {
    res.status(400).send(error.message);
  }
};


export const getProductos = async (req, res) => {
  try {
    // Consultar todos los documentos en la colección Productos
    const productos = await Productos.find();

    // Si no se encuentran documentos, retornar un mensaje
    if (!productos || productos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos' });
    }

    // Si se encuentran documentos, enviarlos como respuesta
    res.status(200).json(productos);
  } catch (error) {
    // Manejar errores
    res.status(400).send(error.message);
  }
};

export const updateProductos= async (req, res) => {
  try {
    const { id } = req.params;
    const { name,description,price,image1,image2,image3,image4,categoria} = req.body;
    await Productos.findOneAndUpdate({ _id: id }, { name,description,price,image1,image2,image3,image4,categoria});
    res.status(200).send("update");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteProductosById = async (req, res) => {
  try { 
    const { id } = req.params;
    const deleteResult = await Productos.findByIdAndDelete(id);

    if (!deleteResult) {
      return res.status(404).json({ error: 'No se pudo encontrar el usuario con el ID proporcionado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el usuario' });
  }
};
