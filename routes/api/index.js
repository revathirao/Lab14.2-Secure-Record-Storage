const router = require("express").Router(); // Import Express Router to create modular route handlers
const userRoutes = require("./userRoutes"); // Import user-related routes (register, login, etc.)
const noteRoutes = require("./noteRoutes"); // Import note-related routes (create, read, update, delete notes)

// Mount subroutes
// Mount user routes at /api/users
// Example: /api/users/register, /api/users/login
router.use("/users", userRoutes);

// Mount note routes at /api/notes
// Example: /api/notes, /api/notes/:id
router.use("/notes", noteRoutes);

// Export the router so it can be used in server.js or app.js
module.exports = router;
