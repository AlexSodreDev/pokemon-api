import { Router } from 'express'

import { PokemonController } from '../controllers/PokemonController'

const router = Router()
const pokemonController = new PokemonController()

router.get('/hello', pokemonController.helloWorld)

export default router
