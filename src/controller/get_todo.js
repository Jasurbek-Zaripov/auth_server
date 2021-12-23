const dbModule = require('../module/db.module')

async function get_todo(req, res) {
  try {
    let users = await dbModule.get_user_in_db()
    let { username, user_id } = req.query

    //validate ---------------------------------------------
    if (!users[username]) {
      return res.json({ ERROR: 'user topilmadi!' })
    }
    if (users[username]['user_id'] != user_id) {
      return res.json({ ERROR: 'kirish mumkin emas!!' })
    }

    res.json(users[username]['todo_list'])
  } catch (xato) {
    return res.json({ ERROR: 'Qandaydir xato (bilish shart emas!)' })
  }
}
module.exports = {
  get_todo,
}
