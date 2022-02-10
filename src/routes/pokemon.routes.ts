import { Router } from 'express'

import { PokemonController } from '../controllers/PokemonController'

const router = Router()
const pokemonController = new PokemonController()

router.get('/hello', pokemonController.helloWorld)
router.get('/pokemons', pokemonController.index)
router.get('/pokemons/:id', pokemonController.findById)

router.post('/pokemons', pokemonController.create)

router.delete('/pokemons/:id', pokemonController.delete)

router.patch('/pokemons/:id', pokemonController.update)

export default router
