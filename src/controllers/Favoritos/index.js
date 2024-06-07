


import Favoritos from '../../models/Favoritos.js';

export const addToFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json({ error: 'User ID and Product ID are required' });
    }

    const favorito = new Favoritos({ usuario: userId, producto: productId });
    await favorito.save();
    res.status(201).json({ message: 'Producto agregado a favoritos correctamente' });
  } catch (error) {
    console.error('Error al agregar producto a favoritos:', error);
    res.status(500).json({ error: 'Ocurrió un error al agregar el producto a favoritos' });
  }
};




export const removeFromFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    await Favoritos.findOneAndDelete({ usuario: userId, producto: productId });
    res.status(200).json({ message: 'Producto eliminado de favoritos correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al eliminar el producto de favoritos' });
  }
};



export const getFavoritesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const favoritos = await Favoritos.find({ usuario: userId }).populate('producto');

    res.status(200).json(favoritos);
  } catch (error) {
    console.error('Error al obtener productos favoritos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los productos favoritos del usuario' });
  }
};

