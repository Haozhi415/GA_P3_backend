const daoRecipes = require("../daos/recipes");
const daoReviews = require("../daos/reviews");

module.exports = {
  getAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getOneRecipe,
  getUserRecipes,
};

/* SAMPLE RECIPE OBJECT FOR POSTMAN TESTING
{
"title": "Test Recipe",
"tags": ["Italian", "Pasta"],
"ingredients": ["1 cup pasta", "2 cups water", "1 tsp salt"],
"preptime": "20 minutes",
"instructions": "Boil water. Add pasta and salt. Cook for 10 minutes.",
"picture_url": "http://example.com/test-recipe.jpg"
}
*/

// Get all recipes that match the query.
// Compatible with single search bar.
// **ADD IN USER FUNCTIONS WHEN AVAILABLE.**//
async function getAllRecipes(query) {
  try {
    // First, we define an empty array called conditions.
    // "conditions" is an array of conditions that will be used to filter the recipes.
    // If the user enters a search term, the search term will be used to filter the recipes.
    // Otherwise, an empty array will return all recipes.
    let conditions = [];

    // query.search is the search term entered by the user.
    // For example, if the URL is http://localhost:3000/recipes?search=pasta,
    // req.query would be { search: 'pasta' }.
    // So, query.search in this code is accessing the search property of the query object,
    // which is equivalent to req.query.search in the context of an Express.js request.
    if (query.search) {
      // Split the search terms into an array of terms.
      // Example: If the user enters "Asian Japanese Western" in the search bar,
      // the searchTerms array will contain three elements: "Asian", "Japanese", and "Western".
      let searchTerms = query.search.split(" ");

      // For each search term, add a condition to the conditions array.
      // regex means regular expression.
      // Regular expression is a sequence of characters that forms a search pattern. It's used
      // for pattern matching with strings.
      // $regex: term is using a regular expression to search for any instances of the variable term within
      // the title field. The $options: 'i' part makes the search case-insensitive.
      // So if term was "Asian", it would match "Asian", "ASIAN", "asian", and so on.
      searchTerms.forEach((term) => {
        conditions.push({ title: { $regex: term, $options: "i" } });
        conditions.push({ tags: { $regex: term, $options: "i" } });
        conditions.push({ ingredients: { $regex: term, $options: "i" } });
        // Add more fields as needed
      });
    }

    // recipes is an array of recipes that match the query.
    // if conditions.length > 0,  it executes a MongoDB query that will return documents that match any
    // of the conditions in the conditions array.
    // $or is a MongoDB operator that allows you to specify a compound query that joins each clause with
    // a logical OR conjunction so that the query selects the documents in the collection that match at
    // least one condition.
    // Here, The $or operator is used to find any documents in the daoRecipes collection where at least
    // one of the conditions in the conditions array is true.
    // If conditions.length = 0, it executes a MongoDB query that will return all documents in the
    // daoRecipes collection.
    let recipes;
    if (conditions.length > 0) {
      recipes = await daoRecipes.find({ $or: conditions });
    } else {
      recipes = await daoRecipes.find({});
    }

    return recipes.map((recipe) => {
      return {
        _id: recipe._id,
        user: recipe.user,
        title: recipe.title,
        tags: recipe.tags,
        ingredients: recipe.ingredients,
        preptime: recipe.preptime,
        instructions: recipe.instructions,
        picture_url: recipe.picture_url,
        reviews: recipe.reviews,
        difficulty: recipe.difficulty,
      };
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "An error occurred");
  }
}

// Get one recipe that matches the query.
async function getOneRecipe(id) {
  try {
    // recipe is defined as a recipe object that matches the query.
    const recipe = await daoRecipes.findById(id);

    return {
      _id: recipe._id,
      user: recipe.user,
      title: recipe.title,
      tags: recipe.tags,
      ingredients: recipe.ingredients,
      preptime: recipe.preptime,
      instructions: recipe.instructions,
      picture_url: recipe.picture_url,
      difficulty: recipe.difficulty,
      reviews: recipe.reviews,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "An error occurred");
  }
}

// Create a new recipe.
// **ADD IN USER FUNCTIONS WHEN AVAILABLE.**//
async function createRecipe(recipe) {
  // Create is a Mongoose method that creates a new document in the database.
  return await daoRecipes.create(recipe);
}

// Update a recipe.
async function updateRecipe(id, recipe) {
  // findByIdAndUpdate is a Mongoose method that finds a matching document, updates it according to the
  // second argument, and returns the updated document. By default, it returns the document as it was
  // before the update. The { new: true } option tells Mongoose to return the updated document.
  const updatedRecipe = await daoRecipes.findByIdAndUpdate(id, recipe, {
    new: true,
  });
  return updatedRecipe;
}

// Delete a recipe.
// **ADD IN USER FUNCTIONS WHEN AVAILABLE.**//
async function deleteRecipe(id) {
  try {
    // Update the status of associated reviews to "deleted"
    await daoReviews.updateMany(
      { recipe: id },
      { $set: { status: "deleted" } }
    );

    // findByIdAndDelete is a Mongoose method that finds a matching document, deletes it, and returns the
    // deleted document.
    await daoRecipes.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "An error occurred");
  }
}


// Get all recipes created by a user.
async function getUserRecipes(userId) {
  const getUserRecipes = await daoRecipes.find({ user: userId });

  if (!getUserRecipes || getUserRecipes.length === 0) {
    return (message = "User has not created any recipes.");
  }
  return getUserRecipes.map((recipe) => {
    return {
      _id: recipe._id,
      user: recipe.user,
      title: recipe.title,
      tags: recipe.tags,
      ingredients: recipe.ingredients,
      preptime: recipe.preptime,
      instructions: recipe.instructions,
      picture_url: recipe.picture_url,
      difficulty: recipe.difficulty,
      reviews: recipe.reviews,
    };
  });
}
  