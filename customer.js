const express = require('express')
var router = express.Router()
const mysql = require('./mysql')
var mysqlConnection = mysql.connection

router.get('/customer/:id', (req, res) => {
  if (req.params.id === undefined) {
    res.send('404 - null custoer id')
    return
  }
  mysqlConnection.query('SELECT * FROM customers WHERE customerNumber = ?', req.params.id, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

module.exports = router
