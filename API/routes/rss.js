const express = require('express');
const router = express.Router();
const controller = require('../controllers/rss');

router.get('/', controller.Default);
router.get('/get_rss', controller.GetRss);
router.get('/scrape', controller.Scrape)

module.exports = router;
