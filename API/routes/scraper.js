const express = require('express');
const router = express.Router();
const controller = require('../controllers/scraper');

router.get('/', controller.Default);
router.get('/scraper', controller.Scraper);

module.exports = router;