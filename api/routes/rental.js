// routes/rental.js

const express = require("express");
const { getRented, addRental, deleteRental,getSingleRented } = require("../controllers/rented");
const authenticateToken = require("../controllers/auth");

const router = express.Router();

router.get('/',authenticateToken, getRented);
router.get('/:id',authenticateToken, getSingleRented);
router.post('/add',authenticateToken, addRental);
router.delete('/delete/:id',authenticateToken, deleteRental);


module.exports = router;