import axios from 'axios'
import { type HttpGetClient } from '../../../data/protocols/http/'
import env from '../../../main/config/env'

export class AxiosHttpClient implements HttpGetClient {
  async get({ url, params }: HttpGetClient.Input): Promise<any> {
    const axiosEdited = axios.create({
      baseURL: env.urlPayment
    })
    const result = await axiosEdited.get(url, { params })
    return result.data
  }
}
