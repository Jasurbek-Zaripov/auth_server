const dbModule = require('../module/db.module')

async function new_user(req, res) {
  try {
    let users = await dbModule.get_user_in_db()
    let { username, password, birth, gender } = req.body

    //validate-------------------------------------------------
    if (!username || !password || !birth || !gender) {
      return res.json({ ERROR: "malumotni to'ldiring!" })
    }
    if (users[username]) {
      return res.json({ ERROR: "bu user ro'yxatda bor!" })
    }

    let user_id = JSON.stringify(new Date()).replace(/[^0-9]/g, e =>
      parseInt(Math.random() * 10000)
    )
    users[username] = {
      user_id,
      password,
      gender,
      birth,
      online: true,
      todo_list: {},
    }

    await dbModule.write_user_to_db(users)

    return res.json({ message: user_id })
  } catch (xato) {
    return res.json({ ERROR: 'Qandaydir xato (bilish shart emas!)' })
  }
}
module.exports = {
  new_user,
}
