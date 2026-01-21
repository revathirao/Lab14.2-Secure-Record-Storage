const Notes = require("../models/Notes");

/**
 * GET ALL NOTES FOR LOGGED-IN USER
 * GET /api/notes
 */
async function getMyNotes(req, res) {
   try {
      const notes = await Notes.find({
         user: req.user._id, //ownership filter
      });

      res.json(notes);
   } catch (err) {
      res.status(500).json(err);
   }
}

/**
 * UPDATE NOTE (only if owner)
 * PUT /api/notes/:id
 */
async function updateNote(req, res) {
   try {
      // // Find the note first
      // const note = await Note.findById(req.params.id);
      // This needs an authorization check
      const note = await Notes.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });

      // If note does not exist
      if (!note) {
         return res
            .status(404)
            .json({ message: "No note found with this id!" });
      }

      // Ownership check-user field on that note matches the authenticated user’s _id.
      if (note.user.toString() !== req.user._id) {
         return res
            .status(403)
            .json({ message: "User is not authorized to update this note." });
      }

      // Update note
      note.title = req.body.title || note.title;
      note.content = req.body.content || note.content;

      await note.save();

      res.json(note);
   } catch (err) {
      res.status(500).json(err);
   }
}

module.exports = {
   getMyNotes,
   updateNote,
};
