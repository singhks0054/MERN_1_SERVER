import express from "express";
import Booking from '../model/Booking.js'
import auth from '../middleware/auth.js'
import User from "../model/User.js";
import { sendBookingMail, sendUpdateBookingMail, sendDeleteBookingMail } from "../email.js";

const router = express.Router()

router.get('/booking', auth, async (req, res) => {
  try {

    const booking = await Booking.find({ owner: req.user._id })
    console.log(booking)
    res.status(200).send(booking)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.get('/booking/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const booking = await Booking.findOne({ _id, owner: req.user._id })
    if (!booking) {
      res.status(400).send('INVALID BOOKING')
    }
    res.status(200).send(booking)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.post('/booking', auth, async (req, res) => {
  const booking = new Booking({
    ...req.body,
    owner: req.user._id
  })
  try {
    const owner = await User.findById(booking.owner)
    const email = owner.email
    const ownerName = owner.name
    sendBookingMail(ownerName, booking.destination, booking.from, booking.to, email)
    await booking.save()
    res.status(200).send('NEW BOOKING DONE SUCCESSFULLY')
  } catch (error) {
    res.status(400).send(error)
  }
})
router.patch('/booking/:id', auth, async (req, res) => {

  const updates = Object.keys(req.body)
  const allowedUpdates = ['from', 'to', 'adult', 'child', 'destination', 'day', 'night', 'completed']
  const isValid = updates.every((update) => allowedUpdates.includes(update))

  if (!isValid) {
    return res.status(400).send({ error: 'INAVLID UPDATE ATTEMPTS !' })
  }
  try {

    const booking = await Booking.findOne({ _id: req.params.id, owner: req.user._id })
    if (!booking) {
      res.status(400).send()
    }

    updates.forEach((update) => booking[update] = req.body[update])

    const owner = await User.findById(booking.owner)
    const email = owner.email
    const ownerName = owner.name
    console.log(ownerName, booking.destination, booking.from, booking.to, email)
    sendUpdateBookingMail(ownerName, booking.destination, booking.from, booking.to, email)
    await booking.save()
    res.status(200).send()
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/booking/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!booking) {
      res.status(400).send()
    }

    const owner = await User.findById(booking.owner)
    const email = owner.email
    const ownerName = owner.name
    console.log(ownerName, booking.destination, booking.from, booking.to, email)
    sendDeleteBookingMail(ownerName, booking.destination, booking.from, booking.to, email)
    res.status(200).send('BOOKING DELETED SUCCESSFULLY')
  } catch (error) {
    res.status(400).send(error)
  }
})
export default router