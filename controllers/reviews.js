const modelReviews = require("../models/reviews");

module.exports = {
  getRecipeReviews,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getUserReviews,
};

// Read Reviews by recipeId

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

// Read Reviews by userId

async function getUserReviews(req, res) {
    try {
      const userId = req.params.userId;
      const reviews = await modelReviews.getRecipeReviewsByUserId(userId);
  
      res.status(200).json(reviews);
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMsg: error.message });
    }
  }

  // Read All Reviews (admin user)

async function getAllReviews(req, res) {
    try {
      const reviews = await modelReviews.getAllReviews();
  
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
      req.body.user, // userId is passed in the request body FOR TESTING ONLY
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
