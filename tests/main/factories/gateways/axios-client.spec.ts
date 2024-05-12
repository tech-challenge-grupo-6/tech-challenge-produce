import { makeAxiosHttpClient } from '../../../../src/main/factories'
import { AxiosHttpClient } from '../../../../src/infra/http-client/axios'

jest.mock('../../../../src/infra/http-client/axios', () => ({
  AxiosHttpClient: jest.fn()
}))

describe('makeAxiosHttpClient Factory', () => {
  it('should call AxiosHttpClient', () => {
    makeAxiosHttpClient()
    expect(AxiosHttpClient).toHaveBeenCalled()
  })

  it('should return a HttpClient on success', () => {
    const httpClient = makeAxiosHttpClient()
    expect(httpClient).toBeTruthy()
    expect(httpClient).toBeInstanceOf(AxiosHttpClient)
  })
})
