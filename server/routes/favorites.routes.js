const express = require('express');
const router = express.Router();

const favorites = require("../controllers/favorites.controller.js");


router.post("/", favorites.create);


router.get("/:userId/:movieId", favorites.findOneByMovieIdAndUserId);


router.get("/:userId", favorites.findAllByUserId);


router.delete("/:userId/:movieId", favorites.deleteByMovieIdAndUserId);


router.delete("/:userId", favorites.deleteAll);


module.exports = router;
