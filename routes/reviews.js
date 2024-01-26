var express = require("express");
var reviewsController = require("../controllers/reviews");
var router = express.Router();
var securityMiddleware = require('../middlewares/security');

/* base path: /reviews */

// Get all reviews of a recipe.
router.get("/show/:recipeId", reviewsController.getRecipeReviews);

// Get all reviews by a user.
router.get('/user/:userId', reviewsController.getUserReviews);

// Get all reviews (admin user).
router.get("/admin/show", securityMiddleware.checkPermission, reviewsController.getAllReviews);

// Create a review for a recipe.
router.post("/create/:recipeId", securityMiddleware.checkLogin, reviewsController.createReview);

// Update a review.
router.patch("/update/:reviewId", securityMiddleware.checkLogin, reviewsController.updateReview);

// Delete a review.
router.delete("/delete/:reviewId", securityMiddleware.checkLogin, reviewsController.deleteReview);

module.exports = router;
