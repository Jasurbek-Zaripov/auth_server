const dbModule = require('../module/db.module')

async function check_user(req, res) {
  try {
    let users = await dbModule.get_user_in_db()
    let { username, password } = req.body

    //validate --------------------------------------------
    if (!users[username]) {
      return res.json({ ERROR: 'user topilmadi!' })
    }
    if (users[username]['password'] != password) {
      return res.json({ ERROR: 'password xato!' })
    }

    users[username]['online'] = true

    await dbModule.write_user_to_db(users)

    return res.json({ message: users[username]['user_id'] })
  } catch (xato) {
    return res.json({ ERROR: 'Qandaydir xato (bilish shart emas!)' })
  }
}

module.exports = {
  check_user,
}
