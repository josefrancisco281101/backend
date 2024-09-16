
import User from '../models/User.js'
import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'

export const validateJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) return res.status(400).json({ message: 'Se debe proveer un token' })

    const decodificado = jwt.verify(authorization, SECRET_KEY)
    const user = await User.findById(decodificado.userId)

    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) return res.status(400).json({ message: 'Token expirado' })

    if (error instanceof jwt.JsonWebTokenError) return res.status(400).json({ message: 'Token inválido' })

    res.status(500).json({ message: 'Error al validar el token' })
  }
}
