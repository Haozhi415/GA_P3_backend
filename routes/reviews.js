var express = require('express');
var reviewsController = require('../controllers/reviews');
var router = express.Router();

/* base path: /reviews */

// question should the ID be recipeId or just "id" as per the recipes route? I'm suggesting recipeId as per coded in my reviews section for clarity.
// question 2, is it right to have a review route? or just combine all routes into 1 js file?
// qn 3 lol, shld the base path be '/reviews' or something like '/:recipeId/reviews'
// we definitely need to review routes again sorry D:< im not very sure about this part.

// Get all reviews that match the query (depends if we want to be able to sort by stars?).
router.get('/show/:recipeId', reviewsController.getAllReviews);
// router.get('/show/:recipeId/sortedByStars', reviewsController.getReviewsSortedByStars);

// Create a recipe.
router.post('/create/:recipeId', reviewsController.createReview);

// Update a recipe.
router.patch('/update/:reviewId', reviewsController.updateReview);

// Delete a recipe.
router.delete('/delete/:reviewId', reviewsController.deleteReview);

module.exports = router;