const router = require('express').Router();
const {
  populateWithGenres,
  populateWithPlatforms
} = require('./middleware/helpers');

const {
  getUserGames,
  addGameToUser,
  removeOwnedGame,
  getOneGame
} = require('./controllers/user');

router.get('/list/:userId', getUserGames);

router.get('/game/:id', getOneGame);

router.put(
  '/owned/:userId',
  populateWithGenres,
  populateWithPlatforms,
  addGameToUser
);

router.patch('/owned/:userId', removeOwnedGame);

router.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😔');
});

module.exports = router;
