import mongoose, { Schema, Document } from 'mongoose';

// Definir la interfaz para el documento de usuario
interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  fechaCreacion: Date;
}

// Crear el esquema para el modelo de usuario
const UsuarioSchema: Schema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true, // Elimina espacios al principio y final
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true, // No se pueden duplicar correos
      match: [/\S+@\S+\.\S+/, 'Por favor ingrese un correo válido'], // Validación de formato de correo
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Crea automáticamente campos `createdAt` y `updatedAt`
  }
);

// Crear y exportar el modelo
const Usuario = mongoose.models.Usuario || mongoose.model<IUsuario>('Usuario', UsuarioSchema);

export default Usuario;
