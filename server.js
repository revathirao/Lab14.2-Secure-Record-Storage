const express = require("express"); // Import Express framework
const path = require("path"); // Import path module (used for serving static files)
const connectDB = require("./db/connection"); // Import database connection function
// Import all application routes
// This loads routes/index.js
// const routes = require("./routes/");
require("dotenv").config(); // Load environment variables from .env file

// Create an Express application
const app = express();
app.use(express.urlencoded({ extended: true }));

// Set server port (use .env PORT or default to 3000)
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON request bodies
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../client/build")));
}

// Use all defined routes (API + others)
app.use(routes);

// Connect to DB, then start server
connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`🌍 Server running on http://localhost:${PORT}`);
   });
});
