var express = require('express');
var recipesController = require('../controllers/recipes');
var router = express.Router();
var securityMiddleware = require('../middlewares/security');

/* base path: /recipes */

// Get all recipes that match the query.
router.get('/show', recipesController.getAllRecipes);

// Get one recipe that matches the query.
router.get('/showone/:id', recipesController.getOneRecipe);

// Get all recipes created by a user.
router.get('/user/:userId', securityMiddleware.checkLogin, recipesController.getUserRecipes);

// Create a recipe.
router.post('/create', securityMiddleware.checkLogin, recipesController.createRecipe);

// Update a recipe.
router.patch('/update/:id', securityMiddleware.checkLogin, recipesController.updateRecipe);

// Delete a recipe.
router.delete('/delete/:id', securityMiddleware.checkPermission, recipesController.deleteRecipe);








module.exports = router;