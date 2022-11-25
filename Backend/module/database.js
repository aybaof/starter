const { linkBDD } = require("./config_bdd");


class MyDataBase {
    constructor() {
        this._fetch.bind(this)
        this._commit.bind(this)
    }

    async _fetch(query, value) {
        try {
            const pool = linkBDD()
            const response = await pool.query(query, value)
            await pool.end()
            return response.length > 0 ? response[0] : false;
        } catch (err) {
            console.log(err)
        }
    }

    async _fetchAll(query, value) {
        try {
            const pool = linkBDD();
            const response = await pool.query(query, value)
            await pool.end()
            return response.length > 0 ? response : false;
        } catch (err) {
            console.log(err)
        }
    }

    async _commit(query, value) {
        const MylinkBDD = linkBDD()
        const connection = await MylinkBDD.getConnection()
        try {
            connection.beginTransaction();
            const operation = await connection.query(query, value);
            await connection.commit();
            await connection.release();
            await MylinkBDD.end();
            return Number(operation.insertId || operation.affectedRows)
        } catch (err) {
            connection.rollback();
            await connection.release();
            return false
        }
    }
}

exports.MyDataBase = MyDataBase