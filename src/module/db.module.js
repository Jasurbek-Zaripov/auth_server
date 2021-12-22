const fs = require('fs/promises')
const { join } = require('path')

class DB_MODULE {
  constructor() {
    this.path_db = join(process.cwd(), 'src', 'database', 'user.db.json')
  }

  //read db
  async get_user_in_db() {
    try {
      let users = await fs.readFile(this.path_db, 'utf-8')
      users = JSON.parse(users || '{}')
      return users
    } catch (error) {
      console.log(error)
    }
  }

  //write db
  async write_user_to_db(data) {
    await fs.writeFile(this.path_db, JSON.stringify(data, null, 2))
  }
}

//export
module.exports = new DB_MODULE()
