const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const birds = require('./birds')
const user = require('./user')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(birds)
app.use(user)

app.get('/', (req, res) => {
  res.send('GET root')
})

app.get('/ab?cd', (req, res) => {
  res.send('GET ab?cd')
})

app.get('/school/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  res.send('regular handling')
})

// handler for the /user/:id path, which renders a special page
app.get('/school/:id', function (req, res, next) {
  res.send('special handling')
})

// Params in the path
// app.get('/users/:userId/books/:bookId', (req, res, next) => {
//   console.log("response will be handled by the next function")
//   next()
// }, (req, res) => {
//   res.send(req.params)
// })
//
// // Query string: "/user?firstName=Desmond&LastName=DAI"
// app.get('/user', (req, res) => {
//   let lastName = (req.query.lastName != undefined ? req.query.lastName : null)
//   res.send("user - firstName: " + req.query.firstName + ", lastName: " + lastName)
// })
//
// app.post('/user', (req, res) => {
//   console.log(req.body)
//   res.send(req.body)
// })

app.post('/', (req, res) => {
  res.send('POST root')
})

app.all('/secret', (req, res, next) => {
  res.send('secret')
})

var options = {
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
app.use('/static', express.static(path.join(__dirname, 'public'), options))

app.use((req, res, next) => {
  res.status(404).send("404 Not Found")
})

app.listen(4000, () => {
  console.log('Example app listening on port 4000!')
})
