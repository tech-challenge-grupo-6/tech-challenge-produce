import axios from 'axios'
import { type HttpGetClient } from '../../../data/protocols/http/'

export class AxiosHttpClient implements HttpGetClient {
  async get ({ url, params }: HttpGetClient.Input): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
