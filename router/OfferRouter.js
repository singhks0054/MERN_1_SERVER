import express from "express";
import Offer from '../model/Offer.js'

const router = express.Router()

router.get('/offer', async (req, res) => {
  try {
    const offer = await Offer.find({})
    if (!offer) {
      return res.status(400).send(offer)
    }
    res.status(200).send(offer)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/offer/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const offer = await Offer.findById(_id)
    if (!offer) {
      res.status(400).send('INVALID OFFER REQUEST')
    }
    res.status(200).send(offer)
  } catch (error) {
    res.status(400).send(e)
  }
})

router.post('/offer', async (req, res) => {
  try {
    const offer = await new Offer(req.body)
    if (!offer) {
      res.status(400).send({ error: "SOME ERROR" })
    }
    offer.save()
    res.status(201).send('NEW OFFER GENERATED SUCCESFULLY')
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/offer/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const offer = await Offer.findByIdAndDelete(_id)
    if (!offer) {
      res.status(400).send('NO OFFER FOUND')
    }
    res.status(200).send(' OFFER DELETED SUCCESSFULLY')
  } catch (error) {
    res.status(400).send(e)
  }
})

router.patch('/offer/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'rating', 'price', 'description']
  const isValid = updates.every((update) => allowedUpdates.includes(update))
  if (!isValid) {
    res.status(400).send('INVALID UPDATE')
  }
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!offer) {
      res.status(400).send('INVALID OFFER')
    }
    offer.save()
    res.status(200).send(' OFFER UPDATED SUCCESFULLY')
  } catch (error) {
    res.status(400).send(e)
  }
})

export default router;