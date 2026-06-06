// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express app
const app = express();

// Connect to MongoDB (replace 'mongodb://localhost:27017/music_player_db' with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/music_player_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a Mongoose schema and model for songs
const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  duration: Number, // in seconds
  genre: String,
});
const Song = mongoose.model('Song', SongSchema);

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (e.g., your CSS file)
app.use(express.static(path.join(__dirname, 'public')));

// Routes for CRUD operations on songs
// Create a new song
app.post('/songs', async (req, res) => {
  try {
    const { title, artist, duration, genre } = req.body;
    const newSong = new Song({ title, artist, duration, genre });
    await newSong.save();
    res.status(201).json({ message: 'Song created successfully', song: newSong });
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all songs
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a song by ID
app.put('/songs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, duration, genre } = req.body;
    const updatedSong = await Song.findByIdAndUpdate(id, { title, artist, duration, genre }, { new: true });
    res.json({ message: 'Song updated successfully', song: updatedSong });
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a song by ID
app.delete('/songs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Song.findByIdAndDelete(id);
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
















const songs = [{
  id: '1',
  songName: ` On My Way <br>
<div class="subtitle">Alan Walker</div>`,
  poster: "img/1.jpg"
},
{
  id: '2',
  songName: ` Alan Walker-Fade <br>
<div class="subtitle">Alan Walker</div>`,
  poster: "img/2.jpg"
},
{
  id: "3",
  songName: `Cartoon - On & On <br><div class="subtitle"> Daniel Levi</div>`,
  poster: "img/3.jpg",
},
{
  id: "4",
  songName: `Warriyo - Mortals <br><div class="subtitle">Mortals</div>`,
  poster: "img/4.jpg",
},
{
  id: "5",
  songName: `Ertugrul Gazi <br><div class="subtitle">Ertugrul</div>`,
  poster: "img/5.jpg",
},
{
  id: "6",
  songName: `Electronic Music <br><div class="subtitle">Electro</div>`,
  poster: "img/6.jpg",
},
{
  id: "7",
  songName: `Agar Tum Sath Ho <br><div class="subtitle">Tamashaa</div>`,
  poster: "img/7.jpg",
},
{
  id: "8",
  songName: `Suna Hai <br><div class="subtitle">Neha Kakker</div>`,
  poster: "img/8.jpg",
},
{
  id: "9",
  songName: `Dilber <br><div class="subtitle">Satyameva Jayate</div>`,
  poster: "img/9.jpg",
},
{
  id: "10",
  songName: `Duniya <br><div class="subtitle">Luka Chuppi</div>`,
  poster: "img/10.jpg",
},
{
  id: "11",
  songName: `Lagdi Lahore Di <br><div class="subtitle">Street Dancer 3D</div>`,
  poster: "img/11.jpg",
},
{
  id: "12",
  songName: `Putt Jatt Da <br><div class="subtitle">Putt Jatt Da</div>`,
  poster: "img/12.jpg",
},
{
  id: "13",
  songName: `Baarishein <br><div class="subtitle">Atif Aslam</div>`,
  poster: "img/13.jpg",
},
{
  id: "14",
  songName: `Vaaste <br><div class="subtitle">Dhvani Bhanushali</div>`,
  poster: "img/14.jpg",
},
{
  id: "15",
  songName: `Lut Gaye <br><div class="subtitle">Jubin Nautiyal</div>`,
  poster: "img/15.jpg",
},
{
  id: "16",
  songName: `Tu Meri Jindgi Hai Tu <br><div class="subtitle">Jubin Nautiyal</div>`,
  poster: "img/16.jpg",
},
{
  id: "17",
  songName: ` Batao Yaad Hai Tumko Wo Jab Dil Ko Churaya Tha <br><div class="subtitle"> Rahat Fateh Ali Khan</div>`,
  poster: "img/17.jpg",
},
{
  id: "18",
  songName: `Mere Dhol Judaiyan<br><div class="subtitle">Ali Sethi Seha Gill</div>`,
  poster: "img/18.jpg",
},
{
  id: "19",
  songName: `Eh Munde Pagal Ne Saare <br><div class="subtitle">Ap Dhillon, Gurinder Gill, Shinda Kahlon</div>`,
  poster: "img/19.jpg",
},
{
  id: "20",
  songName: `Dunny 82K <br><div class="subtitle">Ap Dhillon, Gurinder Gill, Shinda Kahlon</div>`,
  poster: "img/20.jpg",
}
]

















music.addEventListener('ended', ()=>{
  let b = shuffle.innerHTML;

  switch (b) {
      case 'repeat':
          repeat_music();
          break;
      case 'next':
          next_music();
          break;
      case 'random':
          random_music();
          break;
  }
})

function logout() {
  // Perform logout actions, such as clearing cookies and redirecting
  fetch('/logout', { method: 'GET' })
      .then(response => {
          if (response.redirected) {
              window.location.href = response.url; // Redirect to login page
          }
      })
      .catch(error => {
          console.error('Error during logout:', error);
      });
}















