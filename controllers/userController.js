// const express = require("express"); // Import Express framework
// const User = require("../models/User"); // Import the User model (MongoDB schema for users)
// const jwt = require("jsonwebtoken"); // Import jsonwebtoken to create and verify JWT tokens
// const secret = process.env.JWT_SECRET; // Get the JWT secret key from environment variables
// const expiration = "2h"; // Token expiration time (2 hours)
// const bcrypt = require("bcrypt"); // Import bcrypt (used for hashing passwords – usually inside User model)
// const { authMiddleware } = require("../../utils/auth");

const User = require("../models/User");
const { signToken } = require("../utils/auth");
/**
 * REGISTER USER
 * POST /api/users/register
 */

async function registerUser(req, res) {
   try {
      // Create a new user using data sent in req.body
      const user = await User.create(req.body);
      const token = signToken(user);

      // Send success response with created user
      // Return token and user
      res.status(201).json({ token, user });
   } catch (err) {
      // Send error response if validation or creation fails
      res.status(400).json({ error: err.message });
   }
}

/**
 * LOGIN USER
 * POST /api/users/login
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

      //   // JWT payload (NON-SENSITIVE data only)
      //   const payload = {
      //      _id: user._id,
      //      username: user.username,
      //   };

      //   // Sign token
      //   // Generate (sign) a JWT token
      //   const token = jwt.sign(
      //      { data: payload }, // Data stored inside the token
      //      secret, // Secret key to sign the token
      //      { expiresIn: expiration }, // Token expiration time
      //   );

      // Generate token using starter helper
      const token = signToken(user);

      // Send the token back to the client
      res.json({ token, user });
   } catch (err) {
      // Handle unexpected server errors
      res.status(500).json({ error: err.message });
   }
}

module.exports = { registerUser, loginUser };
