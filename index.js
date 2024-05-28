import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './src/database/config.js';
import open from 'open';
import routerCategoria from './src/routes/Categorias/index.js'; 
import routerProductos from './src/routes/Productos/index.js';
import morgan from 'morgan';
import cors from 'cors';
import routerCarrito from './src/routes/Carrito/index.js';
import routerUser from './src/routes/Usuarios/index.js';
// Configurar dotenv para leer el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Defino el puerto aquí, con opción a configurar desde .env

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Ruta para enviar un mensaje
app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

// Conectarse a la base de datos
dbConnect()
  .then(() => {
    console.log('Estoy listo y conectado a la base de datos');

    // Iniciar el servidor
    const server = app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
      // Abrir el navegador con la URL del servidor
      //open(`http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al conectar con la base de datos:', error);
  });

app.use('/Productos', routerProductos);
app.use('/Categoria', routerCategoria);
app.use('/Carrito', routerCarrito);
app.use('/Usuarios', routerUser);
