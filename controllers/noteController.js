const { Note } = require('../models');

/**
 * GET ALL NOTES FOR LOGGED-IN USER
 * GET /api/notes
 */
async function getMyNotes (req, res){
 try {
    const notes = await Note.find({
      user: req.user._id, // 👈 key line (ownership filter)
    });

    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getMyNotes,
};
