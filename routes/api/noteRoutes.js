const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const { getMyNotes } = require("../../controllers/noteController");

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/notes
router.get("/", getMyNotes);

module.exports = router;
