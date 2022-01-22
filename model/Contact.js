import Mongoose from 'mongoose'

const contactSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }

}, {
  timestamps: true
})

const Contact = Mongoose.model('Contact', contactSchema)

export default Contact