// routes/items.js

const express = require("express");
const { getItems } = require("../controllers/items");

const router = express.Router();

router.get('/', getItems);

module.exports = router;