const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { request } = require("http");
const { error } = require("console");
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5000;

const dbPath = path.join(__dirname, "IndianRecipes.db");

let db = null;

const InitializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
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
    const {userName, email, password, gender, DOB, createdAt} = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const selectDBQuery = `SELECT * FROM users WHERE username = '${userName}' OR email = '${email}';`;
    const dbUser = await db.get(selectDBQuery);
    if(dbUser === undefined) {
        const registerUserQuery = `
            INSERT INTO users(username, email, password, gender, date_of_birth, created_At)
            VALUES('${userName}', '${email}', '${hashedPassword}', '${gender}', '${DOB}', '${createdAt}');
        `;
        await db.run(registerUserQuery);
        response.send({userRegistered:"User registered successfully"});
    } else {
        response.status(400);
        response.send({userExists:"User already exists"});
    }
});

app.get('/', async (request, response) => {
    
    response.send({key})
})

// User login API
app.post('/login', async (request, response) => {
    const {userName="", email="", password} = request.body;
    const selectDBQuery = `SELECT * FROM users WHERE username = '${userName}' OR email = '${email}';`;
    const dbUser = await db.get(selectDBQuery);
    console.log(dbUser)
    if(dbUser === undefined) {
        response.status(400);
        response.send({invalid: "Invalid username"});
    } else {
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        if(isPasswordMatched === false) {
            response.status(400);
            response.send({invalid: "Invalid password"});
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
    const {search_q, diet, Limit} = request.query;
    console.log(request.query)
    // const username = request.username;
    // const selectUserQuery = `SELECT user_id FROM users WHERE username = '${username}';`;
    // const dbUser = await db.get(selectUserQuery);
    // userId = dbUser.user_id;
    let recipeQuery = `SELECT * FROM recipes WHERE RecipeName LIKE '%${search_q}%'`;
    if(diet !== "") {
        recipeQuery += ` AND Diet = '${diet}' Limit ${Limit};`;
    } else {
        recipeQuery += ` Limit ${Limit};`;
    }
    const recipeResultsArr = await db.all(recipeQuery);
    response.send(recipeResultsArr);
});

// Search by Ingredients Name API
app.get('/ingredients', authenticateToken, async (request, response) => {
    const {ingredients, Limit} = request.query;
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

// Search by Cuisine API
app.get('/cuisine', authenticateToken, async (request, response) => {
    const {cuisineType, Limit, search_q} = request.query;
    const cuisineQuery = `
        SELECT * FROM recipes WHERE 
        cuisine LIKE '%${cuisineType}%' AND 
        RecipeName LIKE '%${search_q}%' 
        LIMIT ${Limit};
    `;
    const recipeResultsArr = await db.all(cuisineQuery);
    response.send(recipeResultsArr);
})

// Search by Time API
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

// Random recipe generator API
app.get('/random-recipe', async (request, response) => {
    const {limit} = request.body;
    const randomRecipeQuery = `SELECT * FROM recipes ORDER BY RANDOM() LIMIT ${limit};`;
    const recipeResultsArr = await db.all(randomRecipeQuery);
    response.send(recipeResultsArr);
})