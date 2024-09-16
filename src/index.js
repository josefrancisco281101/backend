import express from 'express'
import { PORT } from './config/config.js'
import morgan from 'morgan'
import userRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'
import imagesRoutes from './routes/images.routes.js'
import { validateCORS } from './middlewares/middleware.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(validateCORS)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/images', imagesRoutes)

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))