
// const express = require('express')
// const app = express()

// // app.get('/', (req, res) => {
// //   res.send('GET request to the homepage')
// // })

// app.all('/secret', (req, res, next) => {
//     console.log('Accessing the secret section ...')
//     next() // pass control to the next handler
//   })

// // POST method route
// app.post('/anjay', (req, res) => {
//   res.send('POST request to the homepage')
// })
// app.listen(3000 , () => {
//     console.log('server is ready')
// })

// // PARAMETER PADA ROUTE

// // Route path: /users/:userId/books/:bookId
// // Request URL: http://localhost:3000/users/34/books/8989
// // req.params: { "userId": "34", "bookId": "8989" }

// app.get('/users/:userId/books/:bookId', (req, res) => {
//     res.send(req.params)
//   })

const session = require('express-session');
console.info(session())