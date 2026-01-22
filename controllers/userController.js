const User = require("../models/User"); //    Import User model to interact with the users collection in MongoDB
const { signToken } = require("../utils/auth"); // Import the signToken helper to generate JWT tokens

/**
 * REGISTER USER
 * POST /api/users/register
 * Import the signToken helper to generate JWT tokens
 */
async function registerUser(req, res) {
   try {
      //Create a new user using data sent in req.body
      const user = await User.create(req.body);

      //Generate a JWT token for the newly registered user
      const token = signToken(user);

      // Send success response with created user
      // Return token and user
      res.status(201).json({ token, user });
   } catch (err) {
      // Send an error response if creation fails (e.g., validation error)
      // err.message gives a human-readable explanation of the problem
      res.status(400).json({ error: err.message });
   }
}

/**
 * LOGIN USER
 * POST /api/users/login
 * Authenticates a user and returns a JWT token
 */
async function loginUser(req, res) {
   try {
      // Extract email and password from request body
      const { email, password } = req.body;

      // Find a user in the database with the given email
      const user = await User.findOne({ email });

      // If no user is found, return error
      if (!user) {
         return res.status(400).json({
            message: "Incorrect email or password",
         });
      }

      // Check password
      // Check if the entered password matches the stored (hashed) password
      // isCorrectPassword is usually a method defined in the User schema
      const correctPw = await user.isCorrectPassword(password);

      // If password does not match, return error
      if (!correctPw) {
         return res.status(400).json({
            message: "Incorrect email or password",
         });
      }

      // Generate token using starter helper
      const token = signToken(user);

      // Send the token back to the client
      res.json({ token, user });
   } catch (err) {
      // Handle unexpected server errors
      res.status(500).json({ error: err.message });
   }
}

//EXPORT CONTROLLER FUNCTIONS
module.exports = { registerUser, loginUser };
