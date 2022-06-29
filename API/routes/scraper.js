const express = require('express');
const router = express.Router();
const controller = require('../controllers/scraper');

router.get('/', controller.Default);
router.get('/websitescraper', controller.Scraper)
router.get('/newsscraper', controller.newsScraper)
router.get('/py', controller.py)
router.get('/end', controller.end)
router.get('/links', controller.links)

module.exports = router;
