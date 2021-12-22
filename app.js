const dbModule = require('./src/module/db.module')
const exp = require('express')
const app = exp()
const PORT = 3000
const HOST = 'localhost'

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(exp.json())

app.post('/user/new', async (req, res) => {
  try {
    let users = await dbModule.get_user_in_db()
    let { username, password, birth, gender } = req.body

    if (users[username]) {
      return res.json({ ERROR: "bu user ro'yxatda bor!" })
    }

    users[username] = {
      password,
      gender,
      birth,
      online: true,
      todo_list: [],
    }

    await dbModule.write_user_to_db(users)
    return res.json({ message: 'user qushildi!' })
  } catch (xato) {
    console.log(xato)
  }
})
app.post('/user/check', async (req, res) => {
  try {
    let users = await dbModule.get_user_in_db()
    let { username, password } = req.body

    if (!users[username]) {
      return res.json({ ERROR: 'user topilmadi!' })
    }
    if (users[username]['password'] != password) {
      return res.json({ ERROR: 'password xato!' })
    }
    users[username]['online'] = true
    await dbModule.write_user_to_db(users)
    return res.json({ message: 'ok ' + username })
  } catch (xato) {
    console.log(xato)
  }
})

app.get('/users', async (req, res) => {
  try {
    let users = await dbModule.get_user_in_db()

    for (const user in users) {
      if (Object.hasOwnProperty.call(users, user)) {
        const obj = users[user]
        if (!obj['online']) {
          delete users[user]
        }
      }
    }
    return res.json(users)
  } catch (xato) {
    console.log(xato)
  }
})

app.put('/user/exit', async (req, res) => {
  try {
    let users = await dbModule.get_user_in_db()
    let { username } = req.query
    users[username]['online'] = false
    await dbModule.write_user_to_db(users)
    return res.json({ message: 'user offline' })
  } catch (xato) {
    console.log(xato)
  }
})

app.get('/todo', async (req, res) => {
  try {
    let users = await dbModule.get_user_in_db()
    let { username } = req.query
    res.json(users[username]['todo_list'])
  } catch (xato) {
    console.log(xato)
  }
})

app.put('/todo', async (req, res) => {
  try {
    let users = await dbModule.get_user_in_db()
    let { username, todoID, holat } = req.query

    users[username]['todo_list'][todoID]['holat'] = holat

    await dbModule.write_user_to_db(users)
    return res.json({ message: 'haloti uzgartirildi!' })
  } catch (xato) {
    console.log(xato)
  }
})

app.post('/todo/new', async (req, res) => {
  try {
    let { username, title, todo } = req.body
    let users = await dbModule.get_user_in_db()

    for (const t of users[username]['todo_list']) {
      if (t['title'] == title) {
        return res.json({ ERROR: 'bu todo mavjud!' })
      }
    }

    users[username]['todo_list'].push({
      title,
      todo,
      holat: 'qizil',
      time: new Date().toLocaleTimeString(),
    })

    await dbModule.write_user_to_db(users)
    return res.json({ message: "todo qo'shildi!" })
  } catch (xato) {
    console.log(xato)
  }
})
app.listen(3000, () =>
  console.log(`Backend server is running http://${HOST}:${PORT}`)
)
