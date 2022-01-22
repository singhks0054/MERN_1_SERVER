import express from 'express'
import Contact from '../model/Contact.js'
import { sendContactMail } from '../email.js'

const router = express.Router()

router.post('/contact', async (req, res) => {
  try {
    const contact = await new Contact(req.body)
    if (!contact) {
      res.status(400).send({ error: 'UNABLE TO SEND' })
    }
    sendContactMail(contact.email, contact.name, contact.subject, contact.message)
    res.status(200).send('SENT SUCCESSFULLY')
  } catch (error) {
    res.status(400).send(error)
  }
})
router.get('/contact', async (req, res) => {
  try {
    const contact = await Contact.find({})
    if (!contact) {
      res.status(400).send({ error: 'UNABLE TO SEND' })
    }
    res.status(200).send(contact)
  } catch (error) {
    res.status(400).send(error)
  }
})

export default router;