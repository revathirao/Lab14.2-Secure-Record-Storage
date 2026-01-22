const router = require("express").Router(); // Create a new Express Router instance
const apiRoutes = require("./api"); // This will load routes/api/index.js

// Mount all API routes under /api
// Example: /api/users, /api/notes
router.use("/api", apiRoutes);

// Catch-all for 404
// Catch-all route for undefined endpoints
// This runs if no other route matches
router.use((req, res) => {
   res.status(404).send("<h1>😝 404 Error!</h1>");
});

// Export router to be used in server.js or app.js
module.exports = router;
