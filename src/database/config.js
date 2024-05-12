import mongoose from 'mongoose';

export const dbConnect = async () => {
    try {
        const uri = process.env.URL_DB; // Obtener la URI de conexión desde la variable de entorno
 
        await mongoose.connect(uri); // Conectar a la base de datos
        console.log('Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error('Error al conectar a MongoDB Atlas:', error);
        throw error; // Lanzar el error para manejarlo en el nivel superior si es necesario
    }
};
