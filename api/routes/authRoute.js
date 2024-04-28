const express = require("express");
const   login  = require("../controllers/login");
const  signup  = require("../controllers/signup");
const upload = require("../middlewares/multer")

const router = express.Router();

router.post('/login', login);
router.post('/signup',upload.single('photo'), signup);


module.exports = router;