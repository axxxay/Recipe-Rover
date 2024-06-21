const express = require('express');
const recipeController = require('../controller/recipeController');
const authenticateMiddleware = require('../middleware/authenticateMiddleware');

const router = express.Router();

router.get('/', authenticateMiddleware, recipeController.getRecipeByName);
router.get('/ingredients', authenticateMiddleware, recipeController.getRecipeByIngredients);
router.get('/cuisine', authenticateMiddleware, recipeController.getRecipeByCuisine);

module.exports = router;