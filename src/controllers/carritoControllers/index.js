
import Cart from '../../models/Carrito.js';
import Productos from "../../models/Productos.js";

export const getCarrito = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ error: 'No se encontró el carrito' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCarrito = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const product = await Productos.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.total += product.price * quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCarritoById = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.total -= cart.items[itemIndex].quantity * cart.items[itemIndex].product.price;
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json(cart);
    }

    res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCarrito = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json(cart);
    }

    res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
