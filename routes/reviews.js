var express = require('express');
var reviewsController = require('../controllers/reviews');
var router = express.Router();

/* base path: /reviews */

// Get all reviews that match the query (depends if we want to be able to sort by stars?).
router.get('/show', reviewsController.getAllReviews);

// Create a recipe.
router.post('/create', reviewsController.createReview);

// Update a recipe.
router.patch('/update/:id', reviewsController.updateReview);

// Delete a recipe.
router.delete('/delete/:id', reviewsController.deleteReview);




module.exports = router;