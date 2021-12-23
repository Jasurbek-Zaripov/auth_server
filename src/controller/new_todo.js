const dbModule = require('../module/db.module')

async function new_todo(req, res) {
  try {
    let { username, title, todo, user_id } = req.body
    let users = await dbModule.get_user_in_db()
    //validate---------------------------------
    if (!username || !title || !todo) {
      return res.json({ ERROR: 'malumotni kiriting!' })
    }
    if (!users[username]) {
      return res.json({ ERROR: 'user topilmadi' })
    }
    if (users[username]['user_id'] != user_id) {
      return res.json({ ERROR: 'kirish mumkin emas!!' })
    }
    for (const t in users[username]['todo_list']) {
      if (users[username]['todo_list'][t]['title'] == title) {
        return res.json({ ERROR: 'bu todo mavjud!' })
      }
    }

    let todo_arr = Object.keys(users[username]['todo_list'])
    let id = +todo_arr[todo_arr.length - 1] + 1 || 1

    users[username]['todo_list'][id] = {
      title,
      todo,
      holat: 'qizil',
      time: new Date().toLocaleTimeString(),
    }

    await dbModule.write_user_to_db(users)

    return res.json({ message: id })
  } catch (xato) {
    return res.json({ ERROR: 'Qandaydir xato (bilish shart emas!)' })
  }
}
module.exports = {
  new_todo,
}
