import Productos from "../../models/Productos.js";
import mongoose from "mongoose";

export const createProductos = async (req, res) => {
  try {
    const { id, name, description, image1, image2, image3, image4, price, detalles, categoria } = req.body;
    const nuevoProducto = new Productos({ id, name, description, image1, image2, image3, image4, price, detalles, categoria });
    await nuevoProducto.save();
    res.status(200).send("Producto creado");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getProductos = async (req, res) => {
  try {
    const productos = await Productos.find().populate('categoria');
    if (!productos || productos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos' });
    }
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image1, image2, image3, image4, detalles, categoria, isOferta, descuentoPorcentaje } = req.body;
    const updatedProducto = await Productos.findOneAndUpdate(
      { _id: id },
      { name, description, price, image1, image2, image3, image4, detalles, categoria, isOferta, descuentoPorcentaje },
      { new: true }
    );
    res.status(200).json(updatedProducto);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


export const deleteProductosById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await Productos.findByIdAndDelete(id);
    if (!deleteResult) {
      return res.status(404).json({ error: 'No se pudo encontrar el producto con el ID proporcionado' });
    }
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el producto' });
  }
};

export const toggleOferta = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Productos.findById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    producto.isOferta = !producto.isOferta;
    await producto.save();

    res.status(200).json(producto);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Productos.findById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    producto.isFavorite = !producto.isFavorite;
    await producto.save();

    res.status(200).json(producto);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
