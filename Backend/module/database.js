const { linkBDD } = require("../config_bdd.js");


class MyDataBase {
    constructor() {
        this._fetch.bind(this)
        this._commit.bind(this)
    }

    async _fetch(query, value) {
        try {
            const pool = linkBDD()
            const response = await pool.query(query, value)
            pool.end()
            return response.length > 0 ? response[0] : false;
        } catch (err) {
            console.log(err)
        }
    }

    async _fetchAll(query, value) {
        try {
            const pool = linkBDD();
            const response = await pool.query(query, value)
            pool.end()
            return response.length > 0 ? response : false;
        } catch (err) {
            console.log(err)
        }
    }

    async _commit(query, value) {
        const MylinkBDD = linkBDD()
        const connection = await MylinkBDD.getConnection();
        try {
            connection.beginTransaction();
            const operation = await connection.query(query, value);
            const commit = await connection.commit();
            connection.end();
            return Number(operation.insertId || operation.affectedRows)
        } catch (err) {
            connection.rollback();
            connection.end();
            return false
        }
    }

    async _commitBatch(batch = [{ sql, value }]) {
        const connection = await this.linkBDD.getConnection();
        try {
            const resultId = []
            connection.beginTransaction
            for (const query of batch) {
                const operation = await connection.query(query.sql, value)
                resultId.push(operation.insertId);
            }
            await connection.commit();
            connection.end();
            return resultId;
        } catch (err) {
            connection.rollback();
            connection.end();
            return false
        }
    }
}

exports.MyDataBase = MyDataBase