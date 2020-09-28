const express = require('express');
const router = express.Router();
const path = require('path')
const habitController = require('../site-controller/habitStatusController')
const pathToHabitStatus = path.join(__dirname, 'static serving content', 'habitStatusPage')

router.use(express.static(pathToHabitStatus))

router.get('/:name', habitController)

module.exports = router