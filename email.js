import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
dotenv.config()

const API = process.env.SEND_API

sgMail.setApiKey(API)


const sendContactMail = (email, name, subject, message) => {
  sgMail.send({
    to: email,
    from: 'singhks0054@gmail.com',
    subject: subject,
    text: ` Thanks, ${name} for reaching us regarding ${subject}. We will contact you Soon.`
  })
}
const sendBookingMail = (name, destination, from, to, email) => {
  sgMail.send({
    to: email,
    from: 'singhks0054@gmail.com',
    subject: 'You have successfully booked your trip  !',
    text: ` Welcome ${name} , We are happy to see with us. Your trip of ${destination} is Booked from ${from} to ${to} with us . `
  })
}
const sendUpdateBookingMail = (name, destination, from, to, email) => {
  sgMail.send({
    to: email,
    from: 'singhks0054@gmail.com',
    subject: 'You have successfully updated your booking  !',
    text: ` Hey ${name} , We are happy to see with us. Your updated trip of ${destination} is Booked from ${from} to ${to} with us . `
  })
}
const sendDeleteBookingMail = (name, destination, from, to, email) => {
  sgMail.send({
    to: email,
    from: 'singhks0054@gmail.com',
    subject: 'You have successfully deleted your booking  !',
    text: ` Hey ${name} , We are sad to see this. Your trip of ${destination} is deleted successfully from ${from} to ${to} with us . `
  })
}
const sendWelcomeMail = (email, name) => {
  console.log(email, name, 'from email.js')
  try {
    sgMail.send({
      to: email,
      from: 'singhks0054@gmail.com',
      subject: 'You have successfully created your account  !',
      text: ` Welcome ${name} , We are happy to see with us. Here you will get the best offers and facilities on the best affordable price . `
    })
  } catch (error) {
    console.log(error)
  }
}
const sendBackMail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'singhks0054@gmail.com',
    subject: 'You have successfully deleted your account !',
    text: ` Hey ${name} , We are sad to see you going`
  })
}


export {
  sendContactMail, sendWelcomeMail, sendBackMail, sendBookingMail, sendUpdateBookingMail, sendDeleteBookingMail
}