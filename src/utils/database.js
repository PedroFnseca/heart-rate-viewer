import mysql from "mysql2/promise"
import { config } from "dotenv"

config()

async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })

  return connection
}

export function query(sql, values) {
  return new Promise(async (resolve, reject) => {
    const connection = await createConnection()

    connection
      .execute(sql, values)
      .then((results) => {
        resolve(results)
      })
      .catch((err) => {
        reject(err)
      })
      .finally(() => {
        connection.end()
      })
  })
}