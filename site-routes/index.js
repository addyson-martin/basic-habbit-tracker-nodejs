const express = require('express');
const router = express.Router();
const path = require('path')

router.use('/hobbystatus', require('./habitStatus'))

router.use('/', require('./dashboard'))

module.exports = router