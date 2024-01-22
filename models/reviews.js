const daoRecipes = require("../daos/recipes");
const daoReviews = require("../daos/reviews");
const daoUsers = require("../daos/users");

module.exports = {
  getRecipeReviewsByRecipeId,
  createReview,
  updateReview,
  deleteReview,
  getRecipeReviewsByUserId,
  getAllReviews,
};

// Create a review for a recipe via the recipeId.
// recipeId is req.params.recipeId from controllers.
// reviewData is req.body from controllers.
// to pass in userId in future
async function createReview(userId, recipeId, reviewData) {
  // First find the recipe with the given ID
  // The result is stored in the "recipe" variable.
  const recipe = await daoRecipes.findById(recipeId);

  // If "recipe" returns null, means the recipe does not exist.
  if (!recipe) {
    return (message = "Recipe does not exist.");
  }

  // If "recipe" returns truthy, means the recipe exists.
  // Then create a new review with the provided data (following schema in daos).
  const review = await daoReviews.create({
    recipe: recipeId,
    user: userId,
    title: reviewData.title,
    rating: reviewData.rating,
    content: reviewData.content,
    images: reviewData.images,
  });

  // Next the following adds the _id of the newly created review to the recipe's review array.
  // push is a Mongoose method that adds an item to an array.
  recipe.reviews.push(review._id);

  // After pushing the review to the recipe's review array, save the updated recipe.
  await recipe.save();

  // Return the newly created review
  return review;
}

// Delete a review via the review's ID.
async function deleteReview(reviewId) {
  // First find the review with the given ID.
  const review = await daoReviews.findById(reviewId);

  // If "review" returns null, means the review does not exist.
  // Else, delete the review.
  if (!review) {
    return (message = "Review does not exist.");
  } else {
    await daoReviews.findByIdAndDelete(reviewId);
  }

  // Find the recipe with the given reviewId.
  // The result is stored in the "recipe" variable.
  const recipe = await daoRecipes.findOne({ reviews: reviewId });

  // If "recipe" returns null, means the recipe does not exist.
  // Else, delete the review from the recipe's reviews array.
  if (!recipe) {
    return (message = "Review does not exist.");
  } else {
    // Remove the reviewId from the recipe's reviews array.
    // pull is a Mongoose method that removes an item from an array.
    recipe.reviews.pull(reviewId);

    // After removing the reviewId from the recipe's review array, save the updated recipe.
    await recipe.save();
  }

  return (message = "Review deleted.");
}

// Get all reviews for a recipe by recipeId

async function getRecipeReviewsByRecipeId(recipeId) {
  const getRecipeReviews = await daoReviews.find({ recipe: recipeId });

  if (!getRecipeReviews || getRecipeReviews.length === 0) {
    return (message = "Recipe has no reviews available.");
  }
  return getRecipeReviews;
}

// Update a review via the reviewId.

async function updateReview(reviewId, reviewData) {
  const review = await daoReviews.findById(reviewId);

  if (!review) {
    return { message: "Review does not exist." };
  } else {
    await daoReviews.findByIdAndUpdate(
      reviewId,
      {
        title: reviewData.title,
        rating: reviewData.rating,
        content: reviewData.content,
        images: reviewData.images,
      },
      { new: true }
    );

    const recipe = await daoRecipes.findOne({ reviews: reviewId });

    if (!recipe) {
      return { message: "Review does not exist." };
    }

    return { message: "Review updated successfully." };
  }
}

// Get all reviews for a user by userId
async function getRecipeReviewsByUserId(userId) {
  const getUserReviews = await daoReviews.find({ user: userId });
  
  if (!getUserReviews || getUserReviews.length === 0) {
    return (message = "User has not made any reviews.");
  }
  return getUserReviews;
}
  
  // Get all reviews (admin user)
  async function getAllReviews() {
    const getAllReviews = await daoReviews.find({});
  
    if (!getAllReviews || getAllReviews.length === 0) {
      return (message = "No reviews available.");
    }
    return getAllReviews;
  }