const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
   getMyNotes,
   getOneNotes,
   updateNote,
   deleteNote,
   createNote,
} = require("../../controllers/noteController");

// Apply authMiddleware to all routes in this file
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

module.exports = router;
