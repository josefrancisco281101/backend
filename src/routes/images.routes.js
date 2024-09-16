import { Router } from 'express'
import ImageController from '../controllers/image.controller.js'
const router = Router()

router.get('/:nombre ', ImageController.sendImage)

export default router