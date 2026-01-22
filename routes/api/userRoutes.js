const router = require("express").Router(); // Create a new Express Router instance
const { registerUser, loginUser } = require("../../controllers/userController"); // Import user controller functions

// POST /api/users/register
// Register a new user
router.post("/register", registerUser);

// POST /api/users/login
// Authenticate user and return JWT
router.post("/login", loginUser);

// Export router to be used in the main routes file
module.exports = router;
