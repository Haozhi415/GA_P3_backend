const modelReviews = require("../models/reviews");

module.exports = {
  getRecipeReviews,
  createReview,
  updateReview,
  deleteReview,
};

// Read

async function getRecipeReviews(req, res) {
  try {
    const recipeId = req.params.recipeId;
    const reviews = await modelReviews.getRecipeReviewsByRecipeId(recipeId);

    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

// Create a review based on recipe

async function createReview(req, res) {
  try {
    const review = await modelReviews.createReview(
      req.params.recipeId,
      req.body
    );
    res.status(201).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

// Update

async function updateReview(req, res) {
  try {
    const updatedReview = await modelReviews.updateReview(
      req.params.reviewId,
      req.body
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}

// Delete

async function deleteReview(req, res) {
  try {
    await modelReviews.deleteReview(req.params.reviewId);
    res.status(200).json({ message: "Review deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
}
