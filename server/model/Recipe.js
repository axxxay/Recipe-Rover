const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Recipe = sequelize.define('recipes', {
    Srno: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    RecipeName: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    TranslatedRecipeName: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    Ingredients: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    TranslatedIngredients: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    PrepTimeInMins: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    CookTimeInMins: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    TotalTimeInMins: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Servings: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Cuisine: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Course: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Diet: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    TranslatedInstructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    URL: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  }, {
        freezeTableName: true,
        timestamps: false,
  });
  
  module.exports = Recipe;
  