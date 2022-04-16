const express = require('express');
const router = express.Router();
const controller = require('../controllers/schedule');

router.get('/schedule', controller.Schedule);

module.exports = router;