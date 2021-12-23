const dbModule = require('../module/db.module')

async function put_todo(req, res) {
  try {
    let users = await dbModule.get_user_in_db()
    let { username, todoID, holat, user_id } = req.body

    //validate ---------------------------------------------
    if (!username || !todoID || !holat) {
      return res.json({ ERROR: "malumotni to'ldiring!" })
    }
    if (!users[username]) {
      return res.json({ ERROR: 'user topilmadi' })
    }
    if (users[username]['user_id'] != user_id) {
      return res.json({ ERROR: 'kirish mumkin emas!!' })
    }
    if (!users[username]['todo_list'][todoID]) {
      return res.json({ ERROR: 'user bunday malumot mavjud emas!' })
    }

    users[username]['todo_list'][todoID]['holat'] = holat

    await dbModule.write_user_to_db(users)

    return res.json({ message: 'haloti uzgartirildi!' })
  } catch (xato) {
    return res.json({ ERROR: 'Qandaydir xato (bilish shart emas!)' })
  }
}

module.exports = {
  put_todo,
}
