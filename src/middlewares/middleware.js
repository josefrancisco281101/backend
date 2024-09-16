import { allowedOrigins } from '../config/config.js'

export const validateCORS = (req, res, next) => {
  try {
    const { origin } = req.headers

    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*')
      res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization')
      next()
    } else {
      res.status(403).json({ message: 'No permitido por CORS' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}