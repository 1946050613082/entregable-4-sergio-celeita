// pages/api/usuarios/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Usuario from '../../../models/Usuario';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      await dbConnect();
      const { nombre, correo, edad, roles } = req.body;
      if (!nombre || !correo || !edad || !roles) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }
      const usuario = await Usuario.findByIdAndUpdate(id, { nombre, correo, edad, roles }, { new: true });
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Usamos `error.message` solo si `error` es una instancia de Error
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido al actualizar el usuario' });
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      await dbConnect();
      const usuario = await Usuario.findByIdAndDelete(id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Usamos `error.message` solo si `error` es una instancia de Error
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido al eliminar el usuario' });
      }
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
