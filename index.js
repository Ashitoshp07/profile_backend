
const express = require('express');
const connectDB = require('./config/db');
const multer = require('multer');
const bodyParser = require("body-parser");

const upload = multer({ dest: 'upload/' });

const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const cors = require('cors');

const app = express();
const PORT = 3000;
const env = require('dotenv').config();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/Upload', express.static('Upload'));
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', 1);
app.use(session({
  secret: 'change this',
  resave: false,
  saveUninitialized: true
}));

// Routes
if (process.env.PORT) { session.cookie = { secure: true } }

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/Customer', require("./routes/coustomerRoute"));
app.use('/profile', require("./routes/profileRoute"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

