// routes/rental.js

const express = require("express");
const { getRented, addRental, deleteRental,getSingleRented } = require("../controllers/rented");

const authenticateToken = require("../controllers/auth");
const { get } = require("./items");
const { getPayment, getSinglePayment } = require("../controllers/payment");

const router = express.Router();

router.get('/',authenticateToken, getRented);
router.get('/payment/:id',authenticateToken, getSinglePayment);
router.get('/payment',authenticateToken, getPayment);
router.get('/:id',authenticateToken, getSingleRented);
router.post('/add',authenticateToken, addRental);
router.delete('/delete/:id',authenticateToken, deleteRental);


module.exports = router;