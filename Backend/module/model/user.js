const { MyDataBase } = require("../database.js");
const bcrypt = require("bcrypt");


class User extends MyDataBase {
    constructor(user = {}) {
        super()
        this.id_user = user.id_user
        this.email_user = user.email_user
        this.password_user = user.password_user
        this.admin_user = user.admin_user || 0
        this.defaultTable = "users";
    }

    async _insertUser() {
        const query = `INSERT INTO ${this.defaultTable} (email_user , password_user , admin_user) VALUES (? , ? ,?)`;
        const password = await bcrypt.hash(this.password_user, 10)
        const values = [this.email_user, password, this.admin_user];
        return await this._commit(query, values)
    }

    async _getUser() {
        const query = `SELECT * FROM ${this.defaultTable} WHERE ${this.id_user ? "id_user=?" : "email_user=?"}`
        const value = [this.id_user ? this.id_user : this.email_user];
        return await this._fetch(query, value);
    }
}

exports.User = User