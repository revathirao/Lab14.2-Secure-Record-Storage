// Import Schema and model from mongoose
// Schema defines the structure of documents
// model creates a MongoDB collection based on the schema
const { Schema, model } = require("mongoose");

/*
 *NOTE SCHEMA
 *Defines the structure of a Note document in MongoDB
 *Each note belongs to a specific user
 */
const noteSchema = new Schema({
   // Title of the note
   title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
   },
   // Main content/body of the note
   content: {
      type: String,
      required: [true, "Content is required."],
   },
   // Reference to the user who created the note
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
   },
   // Timestamp for when the note was created
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

/*NOTE MODEL
Creates the "notes" collection using the noteSchema*/
const Note = model("Note", noteSchema);

// Export the Note model so it can be used in controllers and routes
module.exports = Note;
