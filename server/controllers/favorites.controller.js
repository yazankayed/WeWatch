const Favorite = require('../models/favorite.model');


exports.create = async (req, res) => {
  try {
    const favorite = new Favorite({
      userId: req.body.userId, 
      movieId: req.body.movieId,
    });

    const savedFavorite = await favorite.save();
    res.status(201).json(savedFavorite);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Favorite already exists' });
    } else {
      res.status(500).json({ message: 'Failed to create favorite movie' });
    }
  }
};


exports.findAllByUserId = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId }).sort({number:1});
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve favorites' });
  }
};


exports.findOneByMovieIdAndUserId = async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      userId: req.params.userId,
      movieId: req.params.movieId,
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json(favorite);
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      res.status(400).json({ message: 'Invalid user ID or movie ID' });
    } else {
      res.status(500).json({ message: 'Failed to retrieve favorite' });
    }
  }
};


exports.deleteByMovieIdAndUserId = async (req, res) => {
  try {
    const deletedFavorite = await Favorite.findOneAndDelete({
      userId: req.params.userId,
      movieId: req.params.movieId,
    });

    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json(deletedFavorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete favorite' });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const deletedFavorites = await Favorite.deleteMany({
      userId: req.params.userId,
    });
    res.status(200).json(deletedFavorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete favorites' });
  }
};
