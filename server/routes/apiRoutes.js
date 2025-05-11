const express = require("express");
const router = express.Router();
const { submitSelections } = require("../controllers/copController");

router.post("/submit", submitSelections);

module.exports = router;
