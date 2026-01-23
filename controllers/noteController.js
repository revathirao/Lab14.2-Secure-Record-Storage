const Notes = require("../models/Notes"); // Import the Notes model to interact with the MongoDB notes collection

/**
 *CREATE NOTE
 *POST /api/notes
 *Creates a new note for the logged-in user
 **/
async function createNote(req, res) {
   try {
      // Create a new note using the data from request body
      // The note is linked to the logged-in user via req.user._id
      const note = await Notes.create({
         title: req.body.title, // title from request
         content: req.body.content, // content from request
         user: req.user._id, // associate note with logged-in user
      });

      // Send success response with created note
      res.status(201).json(note);
   } catch (err) {
      // Log the error and send internal server error response
      console.error(err);
      res.status(500).json({
         message: "Internal server error. Could not create note.",
      });
   }
}

/**
 * GET ALL NOTES FOR LOGGED-IN USER
 * GET /api/notes
 * Returns only notes owned by the currently authenticated user
 */
async function getMyNotes(req, res) {
   try {
      // Find all notes in the database where user field matches logged-in user
      const notes = await Notes.find({
         // user: req.user._id, //ownership filter
         user: mongoose.Types.ObjectId(req.user._id),
      });
      // Send notes as JSON response
      res.json(notes);
   } catch (err) {
      res.status(500).json(err);
   }
}

/* GET /api/notes/:id - single note (only if owner)
 *GET SINGLE NOTE
 *GET /api/notes/:id
 *Returns one note by ID only if the logged-in user is the owner
 */
async function getOneNotes(req, res) {
   try {
      // Find the note by ID from the URL params
      const note = await Notes.findById(req.params.id);

      // If note does not exist, send 404 Not Found
      if (!note) {
         return res
            .status(404)
            .json({ message: "No note found with this id!" });
      }

      // Ownership check
      // Check if the logged-in user owns the note
      if (note.user.toString() !== req.user._id) {
         return res
            .status(403)
            .json({ message: "User is not authorized to view this note." });
      }
      // Send the note as JSON response
      res.json(note);
   } catch (err) {
      // Log error and send friendly message
      console.error(err);
      res.status(500).json({
         message: "Internal server error. Please try again later.",
      });
   }
}

/**
 * UPDATE NOTE (only if owner)
 * PUT /api/notes/:id
 * Updates a note only if the logged-in user is the owner
 */
async function updateNote(req, res) {
   try {
      // Find the note first
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

      // Update the note with the new data from request body
      // { new: true } returns the updated note
      const updatedNote = await Notes.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true },
      );

      // Return the updated note as JSON
      res.json(updatedNote);
   } catch (err) {
      // Log error and return friendly 500 message
      res.status(500).json(err);
   }
}

/*
 *DELETE NOTE
 *DELETE /api/notes/:id
 *Deletes a note only if the logged-in user is the owner
 */
async function deleteNote(req, res) {
   try {
      // Find the note by ID first
      const note = await Notes.findById(req.params.id);

      // If note does not exist, return 404
      if (!note) {
         return res
            .status(404)
            .json({ message: "No note found with this id!" });
      }

      // Ownership check: ensure the note belongs to the logged-in user
      if (note.user.toString() !== req.user._id) {
         return res
            .status(403)
            .json({ message: "User is not authorized to delete this note." });
      }

      // Delete the note
      await Notes.findByIdAndDelete(req.params.id);
      // Send success response
      res.json({ message: "Note deleted!" });
   } catch (err) {
      res.status(500).json(err);
   }
}

//EXPORT CONTROLLER FUNCTIONS
module.exports = {
   getMyNotes,
   getOneNotes,
   updateNote,
   createNote,
   deleteNote,
};
