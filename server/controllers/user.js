const User = require('../models/user');
const Game = require('../models/game');

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
  addGameToUser,
  removeOwnedGame,
  getUserGames,
  getOneGame
};
