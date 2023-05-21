const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "IndianRecipes.db");

let db = null;

const InitializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3005, () => {
            console.log("Server running at http://localhost:3005");
        })
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
}
InitializeDBAndServer();

// Search by Recipe Name
app.get('/recipe', async (request, response) => {
    const {RecipeName, Limit} = request.body;
    const recipeQuery = `SELECT * FROM recipes WHERE RecipeName LIKE '%${RecipeName}%' Limit ${Limit};`;
    const recipeResultsArr = await db.all(recipeQuery);
    response.send(recipeResultsArr);
});

// Search by Ingredients Name
app.get('/ingredients', async (request, response) => {
    const {ingredients, Limit} = request.body;
    const ingredient_arr = ingredients.split(",");
    let ingredientsQuery = `SELECT * FROM recipes WHERE `;
    for (let ingredient of ingredient_arr) {
        if(ingredient_arr.length === 1) {
            ingredientsQuery += `Ingredients LIKE '%${ingredient}%' Limit ${Limit};`;
        } else {
            ingredientsQuery += `Ingredients LIKE '%${ingredient}%' AND `
        }
    }
    if(ingredient_arr.length !== 1) {
        ingredientsQuery = ingredientsQuery.slice(0, ingredientsQuery.length-5)+`Limit ${Limit};`;
    }
    const recipeResultsArr = await db.all(ingredientsQuery);
    response.send(recipeResultsArr);
});

