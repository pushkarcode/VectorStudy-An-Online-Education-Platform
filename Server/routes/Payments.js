// Import required modules
const express = require("express");
const router = express.Router();

const {capturePayment, veriftsignature} = require('../controllers/Payment');
//! Importing All Midlewares
const {auth, isStudent } = require('../middlewares/auth');

router.post('/capturePayment', auth , isStudent, capturePayment);
router.post('/veriftSignature',veriftsignature);

module.exports = router
