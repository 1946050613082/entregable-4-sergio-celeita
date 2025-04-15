import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Por favor define la variable de entorno MONGODB_URI');
}

const conectarDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // Aquí ya no necesitamos las opciones
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Detenemos la ejecución si la conexión falla
  }
};

export default conectarDB;
