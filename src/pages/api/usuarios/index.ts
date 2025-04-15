// pages/api/usuarios/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Usuario from '../../../models/Usuario';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const usuarios = await Usuario.find({});
      res.status(200).json(usuarios);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Usamos `error.message` solo si `error` es una instancia de Error
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido al obtener los usuarios' });
      }
    }
  } else if (req.method === 'POST') {
    try {
      await dbConnect();
      const { nombre, correo, edad, roles } = req.body;
      if (!nombre || !correo || !edad || !roles) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }
      const usuario = new Usuario({ nombre, correo, edad, roles });
      await usuario.save();
      res.status(201).json(usuario);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Usamos `error.message` solo si `error` es una instancia de Error
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido al crear el usuario' });
      }
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
