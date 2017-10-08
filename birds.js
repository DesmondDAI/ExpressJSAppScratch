const express = require('express')
var router = express.Router()
const mysql = require('./mysql')
var mysqlConnection = mysql.connection

// Middleware that is specific to this route
router.use((req, res, next) => {
  req.requestTime = Date.now()
  next()
})

router.route('/birds')
  .get((req, res) => {
    res.send('request time: ' + req.requestTime + '</br>' + 'GET /birds')
  })
  .post((req, res) => {
    res.send('request time: ' + req.requestTime + '</br>' + 'POST /birds')
  })

  router.use((req, res, next) => {
    console.log('request time: ' + Date.now())
    next()
  })

router.get('/birds/cn', (req, res) => {
  res.send('request time: ' + req.requestTime + '</br>' + 'GET /birds/cn')
})

module.exports = router
