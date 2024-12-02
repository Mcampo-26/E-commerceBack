import Carrito from '../../models/Carrito.js';
import Productos from "../../models/Productos.js";


export const getCarrito = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log('Buscando carrito para User ID:', userId);

    // Buscar el carrito asociado al usuario
    const carrito = await Carrito.findOne({ user: userId }).populate('items.product');

    if (!carrito) {
      console.log('Carrito no encontrado para User ID:', userId);
      return res.status(404).json({ 
        message: 'No se encontró el carrito para este usuario.' 
      });
    }

    // Filtrar items que tengan productos válidos
    const filteredItems = carrito.items.filter(item => item.product !== null);

    // Calcular la cantidad total de items
    const totalItems = filteredItems.reduce((acc, item) => acc + item.quantity, 0);

    // Crear un objeto con los items filtrados y el total
    const filteredCarrito = {
      ...carrito.toObject(),
      items: filteredItems,
      totalItems: totalItems,
    };

    console.log('Carrito final:', filteredCarrito);

    res.status(200).json(filteredCarrito);
  } catch (error) {
    console.error('Error al obtener el carrito:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
};





export const createCarrito = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log("Datos recibidos:", { userId, productId, quantity });
    let carrito = await Carrito.findOne({ user: userId });

    if (!carrito) {
      carrito = new Carrito({ user: userId, items: [] });
    }

    const product = await Productos.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const itemIndex = carrito.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      carrito.items[itemIndex].quantity += quantity;
    } else {
      carrito.items.push({ product: productId, quantity });
    }

    carrito.total += product.price * quantity;
    await carrito.save();
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCarrito = async (req, res) => {
  try {
    const { userId, productId } = req.params; // Obtener IDs de usuario y producto
    const carrito = await Carrito.findOne({ user: userId });

    if (!carrito) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Buscar el índice del producto y eliminarlo
    const itemIndex = carrito.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      carrito.items.splice(itemIndex, 1); // Eliminar el producto
      await carrito.save();
      return res.status(200).json(carrito); // Enviar el carrito actualizado
    }

    res.status(404).json({ error: "Producto no encontrado en el carrito" });
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    res.status(500).json({ error: error.message });
  }
};




export const updateCarrito = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { id } = req.params;
    const carrito = await Carrito.findById(id);

    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const itemIndex = carrito.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      carrito.items[itemIndex].quantity = quantity;
      await carrito.save();
      return res.status(200).json(carrito);
    }

    res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
