const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const { getMyNotes, updateNote } = require("../../controllers/noteController");

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/notes
router.get("/", getMyNotes);

// PUT /api/notes/:id
router.put("/:id", updateNote);

module.exports = router;
