const mongoose = require('mongoose');
const express = require('express');
const twig = require('twig')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.set('views', './views')
app.use(express.static('public'))

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cookie parser middleware
app.use(cookieParser())

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/music_app';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/auth', authRoutes);


app.get('/', (req, res)=>{
    if (!req.cookies.auth) return res.redirect('/login')
    return res.render('index.twig')
})

app.get('/login', (req, res)=>{
    if (req.cookies.auth) return res.redirect('/')
    return res.render('login.twig')
})


app.get('/signup', (req, res)=>{
    if (req.cookies.auth) return res.redirect('/')
    return res.render('signup.twig')
})

app.get('/logout', (req, res)=>{
    res.clearCookie('auth')
    res.redirect('/login')
})

app.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/login');
});

app.get('/home', (req, res)=>{
    if (!req.cookies.auth) return res.redirect('/login')
    return res.render('index.twig')
})

// Other routes for your Twig files
app.get('/Destination', (req, res) => {
    if (!req.cookies.auth) return res.redirect('/login');
    return res.render('destinations.twig');
});

app.get('/home', (req, res) => {
    if (!req.cookies.auth) return res.redirect('/login');
    return res.render('home.twig');
});

app.get('/itinerary', (req, res) => {
    if (!req.cookies.auth) return res.redirect('/login');
    return res.render('itinerary.twig');
});

app.get('/about', (req, res) => {
    if (!req.cookies.auth) return res.redirect('/login');
    return res.render('about.twig');
});

app.get('/contact', (req, res) => {
    if (!req.cookies.auth) return res.redirect('/login');
    return res.render('contact.twig');
});

app.get('/payment', (req, res) => {
    if (!req.cookies.auth) return res.redirect('/login');
    return res.render('payment.twig');
});
// Define your routes for handling login, signup, etc.


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
