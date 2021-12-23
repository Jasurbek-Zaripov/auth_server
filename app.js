const { new_user } = require('./src/controller/new_user')
const { check_user } = require('./src/controller/check_user')
const { get_users } = require('./src/controller/get_users')
const { user_exit } = require('./src/controller/user_exit')
const { get_todo } = require('./src/controller/get_todo')
const { put_todo } = require('./src/controller/put_todo')
const { new_todo } = require('./src/controller/new_todo')
const { check_browser, CORS } = require('./src/middleware/midd')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

//middleware
app.use(check_browser)
app.use(CORS)
app.use(express.json())

//users
app.post('/user/new', new_user)
app.post('/user/check', check_user)
app.get('/users', get_users)
app.put('/user/exit', user_exit)

//todos
app.get('/todo', get_todo)
app.put('/todo', put_todo)
app.post('/todo/new', new_todo)

app.listen(PORT, () =>
  console.log(`Backend server is running http://localhost:${PORT}`)
)
