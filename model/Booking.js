import Mongoose from "mongoose";

const Booking = Mongoose.model('Booking', {
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  adult: {
    type: Number,
    required: true
  },
  child: {
    type: Number,
    default: 0
  },
  day: {
    type: Number,
  },
  night: {
    type: Number,
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: String,
    requied: true,
    ref: 'User'
  }
})

export default Booking