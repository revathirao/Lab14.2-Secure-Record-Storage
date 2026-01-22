const Notes = require("../models/Notes");

async function createNote(req, res) {
   try {
      const note = await Notes.create({
         title: req.body.title,
         content: req.body.content,
         user: req.user._id,
      });

      res.status(201).json(note);
   } catch (err) {
      res.status(500).json(err);
   }
}
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

// GET /api/notes/:id - single note (only if owner)
async function getOneNotes(req, res) {
   try {
      const note = await Notes.findById(req.params.id);

      if (!note) {
         return res
            .status(404)
            .json({ message: "No note found with this id!" });
      }

      // Ownership check
      if (note.user.toString() !== req.user._id) {
         return res
            .status(403)
            .json({ message: "User is not authorized to view this note." });
      }

      res.json(note);
   } catch (err) {
      console.error(err);
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
      const note = await Notes.findById(req.params.id);

      // If note does not exist
      if (!note) {
         return res
            .status(404)
            .json({ message: "No note found with this id!" });
      }

      // Ownership check- user field on that note matches the authenticated user’s _id.
      if (note.user.toString() !== req.user._id) {
         return res
            .status(403)
            .json({ message: "User is not authorized to update this note." });
      }

      const updatedNote = await Notes.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true },
      );

      res.json(updatedNote);
   } catch (err) {
      res.status(500).json(err);
   }
}

async function deleteNote(req, res) {
   try {
      const note = await Notes.findById(req.params.id);

      if (!note) {
         return res
            .status(404)
            .json({ message: "No note found with this id!" });
      }

      if (note.user.toString() !== req.user._id) {
         return res
            .status(403)
            .json({ message: "User is not authorized to delete this note." });
      }

      await Notes.findByIdAndDelete(req.params.id);
      res.json({ message: "Note deleted!" });
   } catch (err) {
      res.status(500).json(err);
   }
}

module.exports = {
   getMyNotes,
   getOneNotes,
   updateNote,
   createNote,
   deleteNote,
};
