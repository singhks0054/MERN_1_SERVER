import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import dotenv from 'dotenv'
dotenv.config()

const JWT_CODE = process.env.JWT
const auth = async (req, res, next) => {

  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, JWT_CODE)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: 'PLEASE AUTHENTICATE !' })
  }

}
export default auth