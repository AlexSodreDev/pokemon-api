
export interface IPokemon {
  readonly _id: string,
  name: string,
  baseExperience?: number,
  height?: number,
  weight?: number,
  gameIndices?: string
}
