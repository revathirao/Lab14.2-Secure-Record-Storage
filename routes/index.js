const router = require("express").Router();
const apiRoutes = require("./api"); // This will load routes/api/index.js

// Mount API routes under /api
router.use("/api", apiRoutes);

// Catch-all for 404
router.use((req, res) => {
   res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;
