const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path: '.env' });

// use cors
const corsOptions = { exposedHeaders: 'Authorization' };
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

// USE MORGAN
app.use(morgan('dev'));

// Champions Route
const championsRouter = require('./routes/champions');
app.use('/champions', championsRouter);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('/views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/views/index'));
});

// Start the server
const port = process.env.PORT || 4444;

app.listen(port, (err) => {
  if (err) {
    return console.error('ERROR', err);
  }
  console.log(`Server started at http://localhost:${port}`);
});

// Connect to the DB
mongoose.connect(`${process.env.DATABASE_URL}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});
mongoose.connection.once('open', () => {
  console.log('Connected to the DB');
});
