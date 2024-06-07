import express from 'express';
import { addToFavorites, removeFromFavorites, getFavoritesByUser } from '../../controllers/Favoritos/index.js';

const router = express.Router();

router.post('/add', addToFavorites);
router.delete('/delete/:userId/:productId', removeFromFavorites);
router.get('/get/:userId', getFavoritesByUser);

export default router;
