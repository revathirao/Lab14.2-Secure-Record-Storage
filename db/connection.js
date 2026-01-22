const mongoose = require("mongoose"); // Import mongoose to manage MongoDB connections and schemas
require("dotenv").config(); // Load environment variables from .env file into process.env

// Get MongoDB connection string from environment variables
const uri = process.env.MONGO_URI;

/*
 *DATABASE CONNECTION
 *Establishes a connection to MongoDB using Mongoose
 */
function connectDB() {
   // Mongoose Connection
   // Connect to MongoDB using the URI from .env
   return (
      mongoose
         .connect(uri)
         // Log success message when connection is established
         .then(() => console.log("Successfully connected to MongoDB!"))
         .catch((error) => {
            // Log error if connection fails
            console.error("Connection error", error);
         })
   );
}

// Export the database connection function
module.exports = connectDB;
