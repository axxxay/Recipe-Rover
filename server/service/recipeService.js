const {v4: uuidv4} = require('uuid');
const Recipe = require('../model/Recipe');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

const getRecipeByName = async (search_q, diet, limit) => {
    try {
        const recipeQuery = {
            where: {
                RecipeName: {
                    [Op.like]: `%${search_q}%`
                }
            }
        }
        if(diet !== "") {
            recipeQuery.where.Diet = {
                [Op.like]: `%${diet}%`
            }
        }
        recipeQuery.limit = limit;
        return await Recipe.findAll(recipeQuery);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getRecipeByIngredients = async (ingredients, limit) => {
    try {
        const ingredientArr = ingredients.split(",");
        const ingredientsConditions = ingredientArr.map(ingredient => ({
            Ingredients: {
                [Op.like]: `%${ingredient}%`
            }
        }));
        const ingredientsQuery = {
            where: {
                [Op.and]: ingredientsConditions
            },
            limit: limit
        };
        return await Recipe.findAll(ingredientsQuery);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getRecipeByCuisine = async (cuisineType, limit, search_q) => {
    try {
        const cuisineQuery = {
            where: {
                Cuisine: {
                    [Op.like]: `%${cuisineType}%`
                },
                RecipeName: {
                    [Op.like]: `%${search_q}%`
                }
            },
            limit: limit
        }
        return await Recipe.findAll(cuisineQuery);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getRecipeByTime = async (minCookingTime, maxCookingTime, limit, RecipeName) => {
    try {
        const cookingTimeQuery = {
            where: {
                TotalTimeInMins: {
                    [Op.between]: [minCookingTime, maxCookingTime]
                },
                RecipeName: {
                    [Op.like]: `%${RecipeName}%`
                }
            },
            order: [
                ['TotalTimeInMins', 'ASC']
            ],
            limit: limit
        }
        return await Recipe.findAll(cookingTimeQuery);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getRandomRecipe = async (limit) => {
    try {
        const randomRecipeQuery = {
            order: [
                [sequelize.fn('RANDOM')]
            ],
            limit: limit
        }
        return await Recipe.findAll(randomRecipeQuery);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    getRecipeByName,
    getRecipeByIngredients,
    getRecipeByCuisine,
    getRecipeByTime,
    getRandomRecipe
};