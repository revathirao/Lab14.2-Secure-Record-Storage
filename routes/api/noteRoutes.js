const router = require("express").Router(); // Create a new Express Router instance
const { authMiddleware } = require("../../utils/auth"); // Import authentication middleware to protect routes

// Import note controller functions
const {
   getMyNotes, // Get all notes for the logged-in use
   getOneNotes, // Get a single note by its ID
   updateNote, // Update an existing note
   deleteNote, // Delete a note
   createNote, // Create a new note
} = require("../../controllers/noteController");

// Apply authMiddleware to all routes in this file
// User must be logged in (valid JWT) to access notes
router.use(authMiddleware);

//Post/Create new notes
router.post("/", createNote);

// GET /api/notes -all notes
router.get("/", getMyNotes);

// Route to get a single note by ID
router.get("/:id", getOneNotes);

// PUT /api/notes/:id
router.put("/:id", updateNote);

// Route to delete a Notes by ID
router.delete("/:id", deleteNote);

// Export router to be used in main routes file
module.exports = router;
