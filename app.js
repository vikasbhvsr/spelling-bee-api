const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
require('dotenv').config({ path: 'variables.env' });

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

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

// Import all the models
// require('./models/Champion');

// Connect to DB
// MongoClient.connect(
//   `mongodb+srv://vikasbhvsr:QrH7uiONe0mp521y@vikascluster-ck21o.mongodb.net/sb_spelling_bee?retryWrites=true&w=majority`,
//   { useUnifiedTopology: true },
//   function (err, client) {
//     if (err) throw err;
//     const db = client.db(process.env.DB_NAME);
//     db.collection('sb_champions')
//       .find()
//       .toArray(function (err, results) {
//         if (err) throw err;

//         results.forEach((result) => {
//           console.log(result.winner_data.name, result.winner_data.win_age);
//         });

//         client.close();
//       });
//   }
// );
