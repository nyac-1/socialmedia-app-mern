const express = require('express');
const authController = require('../controllers/auth.js');



const router = express.Router();

router.post("/signup",authController.signup);



module.exports = router;