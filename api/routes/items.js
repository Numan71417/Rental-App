// routes/items.js

const express = require("express");
const { getItems,addItems, getItem, editItems, deleteItem } = require("../controllers/items");
const  authenticateToken  = require("../controllers/auth");

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/add',authenticateToken, addItems);
router.put('/edit/:id',authenticateToken, editItems);
router.delete('/delete/:id',authenticateToken, deleteItem);

module.exports = router;