import Mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_CODE = process.env.JWT

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    index: { unique: true },
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('EMAIL IS NOT VALID !')
      }
    }
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('PASSWORD CANNOT CONTAIN "PASSWORD" AS A PASSWORD')
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 18) {
        throw new Error('USER SHOULD BE A ADULT')
      }
    }
  },
  number: {
    type: Number,
    required: true,
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  image: {
    type: Buffer
  }
}, {
  timestamps: true
})

userSchema.virtual('Booking', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.age
  return userObject
}


userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, JWT_CODE)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
  } catch (error) {
    console.log(error)
  }
}


userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('USER NOT FOUND')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('USER NOT FOUND')
  }
  return user
}



//hasing the password
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = Mongoose.model('User', userSchema);


export default User;