import Mongoose from "mongoose";

const aboutSchema = new Mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  client: {
    type: Number,
    required: true
  },
  project: {
    type: Number,
    required: true
  },
  countries: {
    type: Number,
    required: true
  },
  coffees: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

const About = Mongoose.model('About', aboutSchema)

export default About;