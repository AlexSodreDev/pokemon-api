/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import axios from 'axios'
import { Request, Response } from 'express'

AWS.config.update({ region: 'us-east-2' })
const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })
const sns = new AWS.SNS()
class PokemonController {
  constructor() {
    // console.log('constructor on')
    // console.log(documentClient)
  }

  private readonly documentClient: DocumentClient

  async helloWorld(req: Request, res: Response) {
    try {
      const helloWorld = 'Hello World!!'
      return res.status(201).send(helloWorld)
    } catch (err) {
      res.status(400).send(err.message)
      console.log(err)
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const pokemon = (req.body)
      console.log(pokemon)

      const response = await axios.get(`${process.env.POKEAPI}${req.body.name}`, { timeout: 6000 })
      console.log('game indices =', response.data.game_indices.length)
      console.log('pokemon id =', response.data.id)

      pokemon.id = response.data.id.toString()
      pokemon.name = response.data.name
      pokemon.baseExperience = response.data.base_experience
      pokemon.height = response.data.height
      pokemon.weight = response.data.weight
      pokemon.gameIndices = response.data.game_indices.length

      const params: DocumentClient.ScanInput = {
        TableName: 'Pokemon',
        FilterExpression: 'id = :id_param',
        ExpressionAttributeValues: {
          ':id_param': pokemon.id
        }
      }
      const pokemonAlreadyExists = await documentClient.scan(params).promise()
      if (pokemonAlreadyExists.Items.length) {
        throw new Error('Uh-oh, this pokemon already exists')
      }

      const result = await documentClient.put({ TableName: 'Pokemon', Item: { id: `${pokemon.id}`, ...pokemon } }).promise()
      console.log(result)

      const snsMessage = await sns.publish({ TopicArn: 'arn:aws:sns:us-east-2:965030996174:pokemon_created', Message: JSON.stringify(pokemon) }).promise()
      console.log(snsMessage)

      return res.status(201).send({ message: 'Gotta catch them all!!!' })
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }

  public async index(req: Request, res: Response) {
    try {
      const indexResult = await documentClient.scan({ TableName: 'Pokemon' }).promise()

      return res.send(indexResult)
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }

  public async findById(req: Request, res: Response) {
    try {
      const params: DocumentClient.QueryInput = {
        TableName: 'Pokemon',
        KeyConditionExpression: 'id = :id_param',
        ExpressionAttributeValues: {
          ':id_param': req.params.id
        }
      }
      const result = await documentClient.query(params).promise()
      return res.status(200).send(result)
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const params: DocumentClient.DeleteItemInput = {
        TableName: 'Pokemon',
        Key: {
          id: req.params.id,
          name: req.body.name
        }
      }
      const result = await documentClient.delete(params).promise()
      console.log(result)

      return res.status(204).json(result)
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const params: DocumentClient.UpdateItemInput = {
        TableName: 'Pokemon',
        Key: {
          id: req.params.id
        },
        UpdateExpression: 'set baseExperience = :baseExperience',
        ExpressionAttributeValues: {
          ':baseExperience': req.body.baseExperience
        }
      }

      const result = await documentClient.update(params).promise()
      console.log(result)

      return res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(400).send(err.message)
    }
  }
}

export { PokemonController }
