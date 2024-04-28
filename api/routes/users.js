// routes/users.js

const express = require("express");
const { getUsers,getUser,deleteUser,editUser, merchantAccount } = require("../controllers/users");
const authenticateToken = require("../controllers/auth");
const upload = require("../middlewares/multer");
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', authenticateToken, getUser);
router.put('/edit/:id', authenticateToken, upload.single('photo'), editUser);
router.put('/merchant/:id',authenticateToken, merchantAccount);
router.delete('/delete/:id',authenticateToken, deleteUser);

module.exports = router;