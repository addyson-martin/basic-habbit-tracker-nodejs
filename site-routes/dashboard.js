const express = require('express');
const router = express.Router();
const path = require('path')
const pathToDashboard = path.join(__dirname, 'static serving content', 'homePage')
const dashBoardController = require('../site-controller/dashboardController')

router.use(express.static(pathToDashboard))

router.get('/', dashBoardController)

module.exports = router