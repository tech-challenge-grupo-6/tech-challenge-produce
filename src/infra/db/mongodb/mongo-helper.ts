import { MongoClient, type Collection } from 'mongodb'
import env from '../../../main/config/env'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
    const newDB = this.client.db(env.database)
    newDB.createCollection(env.collection)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (data: any): any => {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}
