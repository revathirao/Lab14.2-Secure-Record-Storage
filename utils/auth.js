const jwt = require("jsonwebtoken"); // Import jsonwebtoken package to sign and verify JWTs
const secret = process.env.JWT_SECRET; // Secret key used to sign and verify tokens (stored in .env file)
const expiration = "2h"; // Token expiration time

module.exports = {
   // Middleware to protect routes that require authentication
   authMiddleware: function (req, res, next) {
      // Try to get token from request body, query params, or headers
      let token =
         (req.body && req.body.token) ||
         (req.query && req.query.token) ||
         req.headers.authorization;

      // If token is in Authorization header, remove "Bearer " part
      if (req.headers.authorization && typeof token === "string") {
         token = token.split(" ").pop().trim();
      }

      // If no token is found, block access
      if (!token) {
         return res
            .status(401)
            .json({ message: "You must be logged in to do that." });
      }

      try {
         // Verify the token and extract the payload
         const { data } = jwt.verify(token, secret, { maxAge: expiration });
         // Attach user data to the request object
         req.user = data;
      } catch {
         // Token is invalid or expired
         console.log("Invalid token");
         return res.status(401).json({ message: "Invalid token." });
      }

      // Allow request to continue to the next middleware/controller
      next();
   },

   // Function to create/sign a JWT when user logs in or registers
   signToken: function ({ username, email, _id }) {
      // Data to store inside the token
      const payload = { username, email, _id };
      // Sign and return the JWT
      return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
   },
};
