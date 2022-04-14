const express = require('express');
const router = express.Router();
const controller = require('../controllers/rss');

router.get('/', controller.Default);
router.get('/get_rss', controller.GetRss);


module.exports = router;
