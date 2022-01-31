import * as mongoose from 'mongoose'
import { IPokemon } from '../interfaces/IPokemon'

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  baseExperience: {
    type: Number,
    required: false
  },
  height: {
    type: Number,
    required: false
  },
  weight: {
    type: Number,
    required: false
  }
})

export const Pokemon = mongoose.model<IPokemon>('Pokemon', pokemonSchema)
