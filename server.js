const express = require("express");
const path = require("path");
const connectDB = require("./db/connection");
const routes = require("./routes/"); // loads routes/index.js
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

// Connect to DB, then start server
connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`🌍 Server running on http://localhost:${PORT}`);
   });
});
