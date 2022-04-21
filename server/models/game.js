// const mongoose = require('./');
const Genre = require('./genre');
const Platform = require('./platform');
const Developer = require('./developer');

// const { Schema } = mongoose;

// const newGame = Schema({
//   id: Number,
//   name: String,
//   slug: String,
//   description: String,
//   metacritic: Number,
//   released: String,
//   background_image: String,
//   website: String,
//   genres: [Genre], // CHECK POPULATION FOR REFACTORING
//   platforms: [Platform]
// });

// const Game = mongoose.model('game', newGame);

// module.exports = Game;

module.exports = {
  id: Number,
  name: String,
  slug: String,
  description: String,
  metacritic: Number,
  released: String,
  background_image: String,
  website: String,
  genres: [Genre],
  platforms: [Platform],
  developers: [Developer]
};
