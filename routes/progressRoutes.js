const express = require("express");
const { saveProgress, getAllProgress } = require("../controllers/progressController");
const router = express.Router();

router.post("/progress", saveProgress);
router.get("/progress", getAllProgress);

module.exports = router;
