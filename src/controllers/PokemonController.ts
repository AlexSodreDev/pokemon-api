/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { IPokemon } from '../interfaces/IPokemon'

import { Pokemon } from '../models/Pokemon'

class PokemonController {
  async helloWorld(req: Request, res: Response) {
    try {
      const helloWorld = 'Hello World!!'
      return res.status(201).send(helloWorld)
    } catch (err) {
      res.status(400).send(err.message)
      console.log(err)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const pokemon = new Pokemon<IPokemon>(req.body)

      await pokemon.save()
      return res.status(201).send(pokemon)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }
}

export { PokemonController }
