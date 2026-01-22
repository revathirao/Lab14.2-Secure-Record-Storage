const { Schema, model } = require("mongoose"); // Import Mongoose Schema and model
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

// Define the User schema
const userSchema = new Schema({
   username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true,
   },
   email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
   },
   password: {
      type: String,
      required: [true, "Pasword is required."],
      minlength: 5,
   },
});

// hash user password
// Pre-save middleware to hash the password before saving to DB
userSchema.pre("save", async function (next) {
   // Only hash if password is new or has been modified
   if (this.isNew || this.isModified("password")) {
      const saltRounds = 10; // Number of salt rounds for bcrypt
      this.password = await bcrypt.hash(this.password, saltRounds);
   }
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
   return bcrypt.compare(password, this.password); // Returns true/false
};

// Create User model from schema
const User = model("User", userSchema);

// Export User model
module.exports = User;
