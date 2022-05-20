const User = require('../models/user');
const Game = require('../models/game');
const bcrypt = require('bcrypt');

// NOT IMPLEMENTED YET
async function createUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).send({ error: '409', message: 'Wrong credentials' });
  }
  try {
    if (password === '') throw new Error();
    const pswd = await bcrypt.hash(password, +process.env.SALT);
    const newUser = await User.create({ ...req.body, password: pswd });
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ error, message: 'Error, please retry' });
  }
}

async function getUserGames(req, res) {
  try {
    const { userId } = req.params;
    const userColl = await User.findById(userId)
      .select('owned wishlist favorites')
      .populate(
        'owned wishlist favorites',
        'id name metacritic released background_image'
      );
    res.status(200).send(userColl);
  } catch (err) {
    res.status(500).send({ err, message: 'Server error, try again' });
  }
}

async function getOneGame(req, res) {
  try {
    const { id } = req.params;
    const game = await Game.findOne({ id }).populate('genres platforms');
    res.status(200).send(game);
  } catch (err) {
    res.status(500).send({ err, message: 'Server error, try again' });
  }
}

async function addGameToUser(req, res) {
  try {
    const { userId } = req.params;
    const { list } = req.body;
    const game = await Game.findOne({ id: req.body.game.id }).populate({
      path: 'genres platforms'
    });
    if (!game) {
      let newGame = await Game.create(req.body.game);
      await User.findByIdAndUpdate(
        userId,
        { $push: { [list]: { $each: [newGame._id], $position: 0 } } },
        { new: true }
      );
      newGame = await newGame.populate({ path: 'genres platforms' });
      res.status(201).send({ added: newGame, message: 'Added to collection!' });
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $push: { [list]: game._id } },
        { new: true }
      );
      res.status(201).send({ added: game, message: 'Added to collection!' });
    }
  } catch (error) {
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}

async function removeOwnedGame(req, res) {
  const { userId } = req.params;
  const { _id, list } = req.body;
  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { [list]: _id } },
      { new: true }
    );

    res.status(200).send({ id: _id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}

module.exports = {
  createUser,
  addGameToUser,
  removeOwnedGame,
  getUserGames,
  getOneGame
};
