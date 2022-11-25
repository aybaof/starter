const mariadb = require("mariadb");
const { sleep } = require("./global_function.js")

exports.initBdd = async () => {
  const createConnection = async () => {
    return await new Promise(resolve => {
      mariadb
        .createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
        })
        .then((conn) => {
          console.log("MariaDb connected")
          resolve(conn)
        })
        .catch((err) => {
          console.log("still waiting maria");
          resolve(false)
        });
    })

  };
  let isInit = await createConnection()
  while (isInit === false) {
    setTimeout(async () => {
      isInit = await createConnection()
    }, 15000)
    await sleep(30000)
  }
};

exports.linkBDD = () =>
  mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_GROUPOMANIA,
    trace: true,
    connectionLimit: 10,
  });



exports.pingBdd = () => {
  const conn = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_GROUPOMANIA,
  });

  return conn.isValid();
};
