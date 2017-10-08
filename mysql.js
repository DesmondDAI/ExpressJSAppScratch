var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1382461dxm',
  database: 'classicmodels'
})

connection.connect((err) => {
  if (err) throw err
  console.log('mysql now connected')
})

module.exports = mysql
module.exports.connection = connection
