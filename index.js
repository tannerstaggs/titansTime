require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('process');
const cloudinary = require('cloudinary');

//MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());


app.get('/', (req, res) => {
    res.render('home')
});

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        },
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.GMAIL_USERNAME,
        subject: `Message from ${req.body.firstName} ${req.body.lastName} at ${req.body.email}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        }else {
            console.log(info.response);
            res.send('success');
            res.redirect('/');
        }
    })
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

app.get('/episodes', (req, res) => {
    res.render('episodes')
});

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/faq', (req, res) => {
    res.render('faq')
});

app.get('/policy', (req, res) => {
    res.render('policy')
});

app.get('/story', (req, res) => {
    res.render('story')
});

app.get('/support', (req, res) => {
    res.render('support')
});

app.listen(3000, ()=> {
    console.log('Serving on port 3000')
});
