import path from 'node:path'
import fs from 'node:fs/promises'

class ImageController {
  static async sendImage (req, res) {
    try {
      const { nombre } = req.params
      if (!nombre) return res.status(400).json({ message: 'Se debe proveer el nombre de una imagen' })

      const imagePath = path.resolve(`./uploads/${nombre}`)
      await fs.access(imagePath)

      res.sendFile(imagePath)
    } catch (error) {
      if (error?.errno === -4058) return res.status(404).json({ message: 'No existe la imagen' })

      res.status(500).json({ message: error.message })
    }
  }
}

export default ImageController