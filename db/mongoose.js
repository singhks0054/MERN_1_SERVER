import Mongoose from "mongoose";
import chalk from 'chalk'
import dotenv from 'dotenv'
dotenv.config()

const URL = process.env.URL

try {
  Mongoose.connect(URL, { useNewUrlParser: true }).then(() => {
    console.log(chalk.yellow.italic.inverse('DATABASE is Connected'))
  })
} catch (error) {
  console.log(error)
}
