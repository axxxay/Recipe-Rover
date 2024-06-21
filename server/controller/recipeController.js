const recipeService = require('../service/recipeService');

const getRecipeByName = async (request, response) => {
    try {
        const { search_q, diet, limit } = request.query;
        const limitInt = parseInt(limit);
        const recipe = await recipeService.getRecipeByName(search_q, diet, limitInt);
        response.send(recipe);
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
}

const getRecipeByIngredients = async (request, response) => {
    try {
        const { ingredients, limit } = request.query;
        console.log(request.query)
        const limitInt = parseInt(limit);
        const recipe = await recipeService.getRecipeByIngredients(ingredients, limitInt);
        response.send(recipe);
    } catch (error) {
        response.status(400);
        response.send(error.message);
    }
}

const getRecipeByCuisine = async (request, response) => {
    try {
        const { cuisineType, limit, search_q } = request.query;
        const limitInt = parseInt(limit);
        const recipe = await recipeService.getRecipeByCuisine(cuisineType, limitInt, search_q);
        response.send(recipe);
    } catch (error) {
        response.status(400);
        response.send(error.message);
    }
}

module.exports = {
    getRecipeByName,
    getRecipeByIngredients,
    getRecipeByCuisine
}