import { AxiosHttpClient } from '../../../infra/http-client/axios'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
