const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

app.post('/api/form', (req, res) => {
    //console.log(req.body);
    nodemailer.createTestAccount((err, account) => {
        const htmlemail = `
        <h3>Contact Details</h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            post: 587,
            auth:{
                user: 'cyrus94@ethereal.email',
                pass: 'HGZSR4f2rQsCnUr7CD'
            }
        })

        let mailOptions = {
            from: 'test@testaccount.com',
            to: 'cyrus94@ethereal.email',
            replyTo: 'test@testaccount.com',
            subject: 'New Message',
            text: req.body.message,
            html: htmlemail 
        } 

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                return console.log(err)
            }
            console.log('Message Sent: %s', info.message)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
    })
})

const PORT = process.env.PORt || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
