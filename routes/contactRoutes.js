const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const successController = require('../controllers/successController');

// Route for GET /contactus
router.get('/contactus', contactController.getContactForm);

// Route for POST /contactus
router.post('/contactus', contactController.submitContactForm);

// Route for GET /success
router.get('/success', successController.getSuccessPage);

module.exports = router;
