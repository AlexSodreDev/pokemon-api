import { connect } from 'mongoose'
import { config } from 'dotenv'
config()

class Database {
  public async connect(): Promise<any> {
    try {
      const connectionString = process.env.DB_CONNECTION_STRING
      const connectionPoll = await connect(connectionString)
      console.log('>>>> Sucessfully connected with database')
      return connectionPoll
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const database = new Database()
