const modelRecipes = require("../models/recipes")

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getUserRecipes,
};


async function getAllRecipes(req, res) {
    try {
        // recipes here is defined as an array of recipes that match the query.
        const recipes = await modelRecipes.getAllRecipes(req.query);

        // Send the flights array to the client.
        res.json({ recipes: recipes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message })
    }
}


async function getOneRecipe(req, res) {

    try {
        // recipe here is defined as a recipe object that matches the query.
        const recipe = await modelRecipes.getOneRecipe(req.params.id);

        // Send the recipe object to the client.
        res.json({ recipe: recipe });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message })
    }
}


async function createRecipe(req, res) {

    try {

        // recipe here is defined as a recipe object that is created from the request body.
        const recipe = await modelRecipes.createRecipe(req.body);

        // res.status(201) is the status code for "Created".
        res.status(201).json(recipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message })
    }

}


async function updateRecipe(req, res) {

    try {
        updatedRecipe = await modelRecipes.updateRecipe(req.params.id, req.body);

        // res.status(200) is the status code for "OK".
        res.status(200).json(updatedRecipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message })
    }
}


async function deleteRecipe(req, res) {

    try {
        await modelRecipes.deleteRecipe(req.params.id);
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message })
    }
}


async function getUserRecipes(req, res) {
    try {
        const userId = req.params.userId;
        const recipes = await modelRecipes.getUserRecipes(userId);
        res.status(200).json({recipes: recipes});
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message })
    }
}





