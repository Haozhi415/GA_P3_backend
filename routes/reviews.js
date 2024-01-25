var express = require("express");
var reviewsController = require("../controllers/reviews");
var router = express.Router();

/* base path: /reviews */

// Get all reviews of a recipe.
router.get("/show/:recipeId", reviewsController.getRecipeReviews);

// Get all reviews by a user.
router.get('/user/:userId', reviewsController.getUserReviews);

// Get all reviews (admin user).
router.get("/admin/show", reviewsController.getAllReviews);

// Create a review for a recipe.
router.post("/create/:recipeId", reviewsController.createReview, securityMiddleware.checkPermission);

// Update a review.
router.patch("/update/:reviewId", reviewsController.updateReview, securityMiddleware.checkPermission);

// Delete a review.
router.delete("/delete/:reviewId", reviewsController.deleteReview, securityMiddleware.checkPermission);

module.exports = router;
