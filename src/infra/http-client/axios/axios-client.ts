import axios from 'axios'
import { type HttpGetClient } from '../../../data/protocols/http/'

export class AxiosHttpClient implements HttpGetClient {
  async get ({ url, params }: HttpGetClient.Input): Promise<any> {
    const axiosEdited = axios.create({
      baseURL: 'http://localhost:5004/Pagamento/status'
    })
    const result = await axiosEdited.get(url, { params })
    return result.data
  }
}
