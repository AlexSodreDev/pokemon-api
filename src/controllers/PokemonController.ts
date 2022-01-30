/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { Pokemon } from '../models/Pokemon'

class PokemonController {
  async helloWorld(req: Request, res: Response) {
    try {
      const helloWorld = 'Hello World!!'
      return res.status(201).send(helloWorld)
    } catch (error) {
      res.status(400).send(error.message)
      console.log(error)
    }
  }
}

export { PokemonController }
