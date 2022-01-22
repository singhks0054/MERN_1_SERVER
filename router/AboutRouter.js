import express from "express";
import About from '../model/About.js'

const router = new express.Router();

router.get('/about', async (req, res) => {
  try {
    const about = await About.find({})
    res.status(200).send(about)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/about', async (req, res) => {
  try {
    const about = await new About(req.body)
    about.save()
    res.status(201).send('NEW ABOUT GENERATED SUCCESSFULLY')
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/about/:id', async (req, res) => {
  const _id = req.params.id

  const about = await About.findById(_id)

  if (!about) {
    res.status(400).send('NOT FOUND')
  }

  res.status(200).send(about)

})

router.patch('/about/:id', async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['heading', 'description']
  const isValid = updates.every((update) => allowedUpdates.includes(update))

  if (!isValid) {
    return res.status(400).send('INVALID UPDATES')
  }

  try {
    const about = await About.findByIdAndUpdate(_id, req.body, { new: true })

    if (!about) {
      res.status(400).send('INVALID')
    }

    res.status(200).send('ABOUT UPDATED SUCCESSFULLY')
  } catch (error) {
    res.status(400).send(error)
  }

})

router.delete('/about/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const about = await About.findByIdAndDelete(_id)

    if (!about) {
      res.send(400).send('INAVLID ID')
    }

    res.status(200).send('DELETED SUCCESSFULLY')

  } catch (error) {
    res.status(400).send(e)
  }

})

export default router;