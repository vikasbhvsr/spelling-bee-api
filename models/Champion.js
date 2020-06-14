const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const championSchema = new mongoose.Schema({
  winner_data: {
    location: {
      city: {
        type: String,
      },
      state: {
        type: String,
        trim: true,
      },
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    win_age: {
      type: Number,
      trim: true,
    },
    win_year: {
      type: Date,
      required: true,
    },
    winning_word_details: {
      parts_of_speech: {
        type: String,
        trim: true,
        required: true,
      },
      word: {
        type: String,
        trim: true,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model('Champion', championSchema);
