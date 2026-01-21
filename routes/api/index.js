const router = require("express").Router();
const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");

// Mount subroutes
router.use("/users", userRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
