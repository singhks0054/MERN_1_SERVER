import express from 'express'
import multer from 'multer';
import sharp from 'sharp';
import User from '../model/User.js'
import auth from '../middleware/auth.js'

import { sendBackMail, sendWelcomeMail } from '../email.js';
const router = express.Router();

router.get('/user', async (req, res) => {
  try {
    const user = await User.find({})
    if (!user) {
      res.status(400).send('NO USERS FOUND')
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/user/me', auth, async (req, res) => [
  res.send(req.user)
])
router.post('/user/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})
router.post('/user/logoutall', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/user', async (req, res) => {

  try {
    const user = await new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    console.log(user.email, user.name)
    sendWelcomeMail(user.email, user.name)
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/user/login', async (req, res) => {
  try {
    console.log(req.body.email, req.body.password)
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/user/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'age', 'address', 'password', 'number', 'email']
  const isValid = updates.every((update) => allowedUpdates.includes(update))

  if (!isValid) {
    res.status(400).send('INVALID UPDATE ATTEMPTS')
  }
  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.status(200).send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.delete('/user/me', auth, async (req, res) => {

  try {
    sendBackMail(req.user.email, req.user.name)
    await req.user.remove()
    res.status(200).send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
})

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)/)) {
      cb(new Error('Please upload a Image'))
    }
    cb(undefined, true)
  }
})

router.post('/user/img', auth, upload.single('img'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ height: 250, width: 250 }).png().toBuffer()
  req.user.image = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.get('/user/:id/img', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user || !user.image) {
      throw new Error()
    }
    res.set('content-type', 'image/png')
    res.send(user.image)
  } catch (error) {
    res.status(400)
  }
})

export default router