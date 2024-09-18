import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'

class User {
  static async all () {
    const [users] = await pool.execute(
      'SELECT user_id, f_name, m_name, l_name, username, email, image FROM users'
    )
    return users
  }


  static async findById (id) {
    const [user] = await pool.execute(
      'SELECT user_id, f_name, m_name, l_name, username, email, password, image FROM users WHERE user_id = ?',
      [id]
    )
    return user[0]
  }


  static async findOne (columna, valor) {
    const [user] = await pool.execute(
      `SELECT user_id, f_name, m_name, l_name, username, email, password, image FROM users WHERE ${columna} = ?`,
      [valor]
    )
    return user[0]
  }


  static async create({ fName, lName, username, email, password, mName, image }) {
    if (!fName || !lName || !username || !email || !password) {
      throw new Error('Campos obligatorios faltantes');
    }

    const encriptada = await bcrypt.hash(password, 10);
    const datosGuardar = [fName, lName, username, email, encriptada];

    const camposObligatorios = ['f_name', 'l_name', 'username', 'email', 'password'];

    if (mName) {
      camposObligatorios.push('m_name');
      datosGuardar.push(mName);
    }

    if (image) {
      camposObligatorios.push('image');
      datosGuardar.push(image);
    }

    const stringCamposObligatorios = camposObligatorios.join(', ');
    const placeholders = camposObligatorios.map(() => '?').join(', ');

    const query = `INSERT INTO users(${stringCamposObligatorios}) VALUES (${placeholders})`;
    const [resultado] = await pool.execute(query, datosGuardar);
    const user = await this.findById(resultado.insertId);

    delete user.password;

    return user;
  }
  static async deleteByID (id) {
    const [resultado] = await pool.execute(
      'DELETE FROM users WHERE user_id = ?',
      [id]
    )
    return resultado
  }

  static async update ({
    userId,
    fName,
    lName,
    username,
    email,
    password,
    mName,
    image
  }) {
    let query = 'UPDATE users SET '
    const camposActualizar = []
    const valoresActualizar = []
  
    if (fName !== undefined) {
      camposActualizar.push('f_name = ?')
      valoresActualizar.push(fName || null)
    }
  
    if (lName !== undefined) {
      camposActualizar.push('l_name = ?')
      valoresActualizar.push(lName || null)
    }
  
    if (username !== undefined) {
      camposActualizar.push('username = ?')
      valoresActualizar.push(username || null)
    }
  
    if (email !== undefined) {
      camposActualizar.push('email = ?')
      valoresActualizar.push(email || null)
    }
  
    if (password !== undefined) {
      camposActualizar.push('password = ?')
      const encriptada = await bcrypt.hash(password, 10)
      valoresActualizar.push(encriptada)
    }
  
    if (mName !== undefined) {
      camposActualizar.push('m_name = ?')
      valoresActualizar.push(mName || null)
    }
  
    if (image !== undefined) {
      camposActualizar.push('image = ?')
      valoresActualizar.push(image || null)
    }
  
    if (camposActualizar.length === 0) return null
  
    query += camposActualizar.join(', ') + ' WHERE user_id = ?'
    valoresActualizar.push(userId)
  
    const [resultado] = await pool.execute(query, valoresActualizar)
    return resultado
  }
}

export default User