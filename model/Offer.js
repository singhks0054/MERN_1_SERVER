import Mongoose from "mongoose";

const offerSchema = new Mongoose.Schema({
  title: {
    type: String,
    requird: true
  },
  rating: {
    type: Number
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  from: {
    type: Date,
  },
  to: {
    type: Date
  }
}, {
  timestamps: true
})

const Offer = Mongoose.model('Offer', offerSchema)

export default Offer