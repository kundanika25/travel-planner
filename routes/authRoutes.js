const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.cookie('auth', newUser.email)
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        res.cookie('auth', user.email)
        // password hashing
        // cookies
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route handler for the about.twig file
router.get('/about', (req, res) => {
    res.render('about.twig');
});

// Route handler for the contact.twig file
router.get('/contact', (req, res) => {
    res.render('contact.twig');
});

// Route handler for the destinations.twig file
router.get('/destinations', (req, res) => {
    res.render('destinations.twig');
});

// Route handler for the home.twig file
router.get('/home', (req, res) => {
    res.render('home.twig');
});

// Route handler for the itinerary.twig file
router.get('/itinerary', (req, res) => {
    res.render('itinerary.twig');
});

// Route handler for the payment.twig file
router.get('/payment', (req, res) => {
    res.render('payment.twig');
});

// Route handler for the rough.twig file
router.get('/rough', (req, res) => {
    res.render('rough.twig');
});

module.exports = router;
