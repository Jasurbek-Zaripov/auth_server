const dbModule = require('../module/db.module')

async function get_users(req, res) {
  try {
    let users = await dbModule.get_user_in_db()

    //delete any keys
    for (const user in users) {
      if (Object.hasOwnProperty.call(users, user)) {
        const obj = users[user]
        if (!obj['online']) {
          delete users[user]
        }
        delete obj['user_id']
        delete obj['todo_list']
      }
    }

    return res.json(users)
  } catch (xato) {
    return res.json({ ERROR: 'Qandaydir xato (bilish shart emas!)' })
  }
}
module.exports = {
  get_users,
}
