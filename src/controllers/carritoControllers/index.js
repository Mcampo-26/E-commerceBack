import Carrito from '../../models/Carrito.js';
import Productos from "../../models/Productos.js";


export const getCarrito = async (req, res) => {
  try {
    console.log('getCarrito called');
    const { userId } = req.params;
    console.log('User ID:', userId);

    const carrito = await Carrito.findOne({ user: userId }).populate('items.product');
    console.log('Carrito encontrado:', carrito);

    if (!carrito) {
      console.log('No se encontró el carrito');
      return res.status(404).json({ error: 'No se encontró el carrito' });
    }

    // Filtrar los productos nulos del carrito
    const filteredItems = carrito.items.filter(item => item.product !== null);
    console.log('Filtered Items:', filteredItems);

    // Calcular la cantidad total de items en el carrito
    const totalItems = filteredItems.reduce((acc, item) => acc + item.quantity, 0);
    console.log('Total Items:', totalItems);

    // Crear un nuevo objeto de carrito con los items filtrados y la cantidad total de items
    const filteredCarrito = {
      ...carrito.toObject(),
      items: filteredItems,
      totalItems: totalItems,  // Agregar la cantidad total de items al carrito
    };

    console.log('Filtered Carrito:', filteredCarrito);

    res.status(200).json(filteredCarrito);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: error.message });
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
    const { userId, productId } = req.params;  // Obtener los IDs de los parámetros de la URL
    const carrito = await Carrito.findOne({ user: userId });

    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const itemIndex = carrito.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      const product = await Productos.findById(productId);
      carrito.total -= carrito.items[itemIndex].quantity * product.price;
      carrito.items.splice(itemIndex, 1);
      await carrito.save();
      return res.status(200).json(carrito);
    }

    res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  } catch (error) {
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
