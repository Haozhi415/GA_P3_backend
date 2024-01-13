var express = require('express');
var recipesController = require('../controllers/recipes');
var router = express.Router();

/* base path: /recipes */

// Get all recipes that match the query.
router.get('/show', recipesController.getAllRecipes);

// Get one recipe that matches the query.
router.get('/show/:id', recipesController.getOneRecipe);

// Create a recipe.
router.post('/create', recipesController.createRecipe);

// Update a recipe.
router.patch('/update/:id', recipesController.updateRecipe);

// Delete a recipe.
router.delete('/delete/:id', recipesController.deleteRecipe);








module.exports = router;