const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { request } = require("http");
const { error } = require("console");

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

// Authenticating user
const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeaders = request.headers['authorization'];
    if(authHeaders != undefined) {
        jwtToken = authHeaders.split(" ")[1];
    }
    if(jwtToken === undefined) {
        response.status(401);
        response.send("Invalid JWT Token");
    } else {
        jwt.verify(jwtToken, "reciperover69420", async (error, payload) => {
            if(error) {
                response.status(401);
                response.send("Invalid JWT Token");
            } else {
                request.username = payload.username;
                next();
            }
        });
    }
}

// User registration API
app.post('/register', async (request, response) => {
    const {userName, email, password, age, gender, DOB, createdAt} = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const selectDBQuery = `SELECT * FROM users WHERE username = '${userName}' OR email = '${email}';`;
    const dbUser = await db.get(selectDBQuery);
    if(dbUser === undefined) {
        const registerUserQuery = `
            INSERT INTO users(username, email, password, age, gender, date_of_birth, created_At)
            VALUES('${userName}', '${email}', '${hashedPassword}', ${age}, '${gender}', '${DOB}', '${createdAt}');
        `;
        await db.run(registerUserQuery);
        response.send("User registered successfully");
    } else {
        response.status(400);
        response.send("User already exists");
    }
});

// User login API
app.post('/login', async (request, response) => {
    const {userName="", email="", password} = request.body;
    const selectDBQuery = `SELECT * FROM users WHERE username = '${userName}' OR email = '${email}';`;
    const dbUser = await db.get(selectDBQuery);
    if(dbUser === undefined) {
        response.status(400);
        response.send("Invalid username");
    } else {
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        if(isPasswordMatched === false) {
            response.status(400);
            response.send("Invalid password");
        } else {
            const payload = {
                username: userName
            };
            const jwtToken = jwt.sign(payload, "reciperover69420");
            response.status(200);
            response.send({jwtToken});
        }
    }
});

let userId = null;  // userId identifier has user id of a user which is unique, it is generated when user login

// Search by Recipe Name API
app.get('/recipe', authenticateToken, async (request, response) => {
    const {RecipeName, diet, Limit} = request.body;
    const username = request.username;
    const selectUserQuery = `SELECT user_id FROM users WHERE username = '${username}';`;
    const dbUser = await db.get(selectUserQuery);
    userId = dbUser.user_id;
    let recipeQuery = `SELECT * FROM recipes WHERE RecipeName LIKE '%${RecipeName}%'`;
    if(diet !== "") {
        recipeQuery += ` AND Diet LIKE '%${diet}%' Limit ${Limit};`;
    } else {
        recipeQuery += ` Limit ${Limit};`;
    }
    const recipeResultsArr = await db.all(recipeQuery);
    response.send(recipeResultsArr);
});

// Search by Ingredients Name API
app.get('/ingredients', authenticateToken, async (request, response) => {
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

app.get('/cuisine', authenticateToken, async (request, response) => {
    const {cuisineType, Limit, RecipeName} = request.body;
    const cuisineQuery = `
        SELECT * FROM recipes WHERE 
        cuisine LIKE '%${cuisineType}%' AND 
        RecipeName LIKE '%${RecipeName}%' 
        LIMIT ${Limit};
    `;
    const recipeResultsArr = await db.all(cuisineQuery);
    response.send(recipeResultsArr);
})

app.get('/timeToCook', authenticateToken, async (request, response) => {
    const {minCookingTime, maxCookingTime, Limit, RecipeName} = request.body;
    const cookingTimeQuery = `
        SELECT * FROM recipes WHERE 
        TotalTimeInMins >= ${minCookingTime} AND
        TotalTimeInMins <= ${maxCookingTime} AND
        RecipeName LIKE '%${RecipeName}%'
        ORDER BY TotalTimeInMins ASC
        LIMIT ${Limit};
    `;
    const recipeResultsArr = await db.all(cookingTimeQuery);
    response.send(recipeResultsArr);
})