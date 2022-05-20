const Genre = require('../models/genre');
const Platform = require('../models/platform');

async function populateWithGenres(req, res, next) {
  try {
    const genIds = req.body.game.genres.map(genre => genre.id);
    const genres = await Genre.find({ id: { $in: genIds } });
    if (!genres) throw new Error();
    req.body.game.genres = genres.map(gen => gen._id);
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

async function populateWithPlatforms(req, res, next) {
  try {
    const platIds = req.body.game.platforms.map(p => p.id);
    const platforms = await Platform.find({ id: { $in: platIds } });
    if (!platforms) throw new Error();
    req.body.game.platforms = platforms.map(p => p._id);
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

module.exports = { populateWithGenres, populateWithPlatforms };
