import * as mongoose from 'mongoose'

export interface IPokemon extends mongoose.Document {
  readonly _id: string,
  name: string,
  baseExperience?: number,
  height?: number,
  weight?: number
}
