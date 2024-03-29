var express = require('express');
var usersController = require('../controllers/users');
var securityMiddleware = require('../middlewares/security');
var router = express.Router();

// base path: /users

// Show all user profiles
router.get('/show', usersController.getAllUsers);

// Show particular user profile
router.get('/showOne/:id', usersController.getUser);

// User Login
router.get("/login", usersController.getLoginDetails);
router.post("/login", usersController.loginUser);

router.post("/logout", securityMiddleware.checkPermission, usersController.logoutUser);

// Create a user profile
router.post('/create', usersController.createUser);

// Update a user profile
router.patch('/update/:id', usersController.updateUser); 

// Delete a user profile
router.delete('/delete/:id', usersController.deleteUser);

module.exports = router;