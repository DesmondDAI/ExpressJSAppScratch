const express = require('express')
var router = express.Router()

router.use('/user', (req, res, next) => {
  if (!req.headers['x-auth']) {
    console.log('Error - user without x-auth')
    return next('router')
  }
  next()
})

router.get('/user', (req, res) => {
  res.send('hello user with x-auth!')
})

module.exports = router
