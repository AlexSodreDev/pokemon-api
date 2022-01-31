import { Router } from 'express'

import { PokemonController } from '../controllers/PokemonController'

const router = Router()
const pokemonController = new PokemonController()

router.get('/hello', pokemonController.helloWorld)

router.post('/pokemons', pokemonController.create)

export default router
