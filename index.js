import express from "express";
import './db/mongoose.js'
import dotenv from "dotenv";
import chalk from 'chalk'
import cors from 'cors'
import AboutRouter from './router/AboutRouter.js'
import OfferRouter from './router/OfferRouter.js'
import BookingRouter from './router/BookingRouter.js'
import UserRouter from './router/UserRouter.js'
import ContactRouter from './router/ContactRouter.js'

dotenv.config();
const app = express();
app.use(cors())
const PORT = process.env.PORT
app.use(express.json())
app.use(AboutRouter)
app.use(OfferRouter)
app.use(BookingRouter)
app.use(UserRouter)
app.use(ContactRouter)


app.listen(PORT, () => {
  console.log(chalk.cyan('SERVER is running at PORT : ' + PORT))
})