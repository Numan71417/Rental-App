// routes/users.js

const express = require("express");
const { getUsers,addUser } = require("../controllers/users");
const router = express.Router();

router.get('/', getUsers);
router.post('/adduser', addUser);

module.exports = router;