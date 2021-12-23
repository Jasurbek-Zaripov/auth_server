const dbModule = require('../module/db.module')

async function user_exit(req, res) {
  try {
    let users = await dbModule.get_user_in_db()
    let { username, user_id } = req.body

    //validate ----------------------------------------
    if (!users[username]) {
      return res.json({ ERROR: 'user topilmadi!' })
    }
    if (users[username]['user_id'] != user_id) {
      return res.json({ ERROR: 'kirish mumkin emas!!' })
    }

    users[username]['online'] = false
    await dbModule.write_user_to_db(users)

    return res.json({ message: 'user offline' })
  } catch (xato) {
    return res.json({ ERROR: 'Qandaydir xato (bilish shart emas!)' })
  }
}
module.exports = {
  user_exit,
}
