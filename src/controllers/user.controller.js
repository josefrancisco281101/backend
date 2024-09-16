import User from '../models/User.js'

class UserController {
  static async index (req, res) {
    try {
      const users = await User.all()
      res.json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getByID (req, res) {
    try {
      delete req.user.password
      res.json(req.user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async store (req, res) {
    try {
      const { fName, lName, username, email, password, mName, image } = req.body
      if (!fName || !lName || !username || !email || !password) return res.status(400).json({ message: 'Faltan datos' })

      const user = await User.create({
        fName,
        lName,
        username,
        email,
        password,
        mName,
        image
      })

      res.status(201).json({ message: 'Usuario creado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params
      const resultado = await User.deleteByID(id)

      if (resultado.affectedRows === 0) return res.status(400).json({ message: 'El usuario ya fue eliminado' })

      res.json({ message: 'Usuario eliminado' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async updatePut (req, res) {
    try {
      const { id } = req.params
      const {
        fName,
        lName,
        username,
        email,
        password,
        mName,
        image
      } = req.body

      if (!fName || !lName || !username || !email || !password || !mName || !image) return res.status(400).json({ message: 'Datos incompletos' })

      const resultado = await User.update({
        userId: id,
        fName,
        lName,
        username,
        email,
        password,
        mName,
        image
      })

      if (resultado.affectedRows === 0) return res.status(400).json({ message: 'No se pudo actualizar el usuario' })

      const user = await User.findById(id)
      delete user.password

      res.json({ message: 'Usuario actualizado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async updatePatch (req, res) {
    try {
      const { id } = req.params
      const {
        fName,
        lName,
        username,
        email,
        password,
        mName,
        image
      } = req.body

      const resultado = await User.update({
        userId: id,
        fName,
        lName,
        username,
        email,
        password,
        mName,
        image
      })

      if (!resultado) return res.status(400).json({ message: 'No se enviaron datos para la actualización' })

      if (resultado.affectedRows === 0) return res.status(400).json({ message: 'No se pudo actualizar el usuario' })

      const user = await User.findById(id)
      delete user.password

      res.json({ message: 'Usuario actualizado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default UserController