const ModelBase = require('./ModelBase')
const table = "users"

class Users extends ModelBase{
    constructor(){
        super(table)
    }
    getUserByEmail(email){
        return this.selectRaw("email")
            .where("email", "LIKE", `'%${email}%'`)
            .get(1)
    }
}
module.exports = Users