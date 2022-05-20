const mongoose = require('./');
const Developer = require('./developer');

const { Schema } = mongoose;

const newGame = new Schema({
  id: Number,
  name: String,
  slug: String,
  description: String,
  metacritic: Number,
  released: String,
  background_image: String,
  website: String,
  genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  platforms: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
  developers: [Developer]
});

const Game = mongoose.model('Game', newGame);

module.exports = Game;
