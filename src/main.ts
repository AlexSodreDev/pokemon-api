import 'reflect-metadata'

import express from 'express'

import pokemonsRoute from './routes/pokemon.routes'

import { config } from 'dotenv'

(async function main() {
  config()
  try {
    const app = express()
    app.use(express.json())
    app.use(pokemonsRoute)
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`>>>> Server started at http://localhost:${process.env.SERVER_PORT}`)
    })
  } catch (err) {
    console.log('Server failed to start')
    console.error(err)
    process.exit(1)
  }
}())
