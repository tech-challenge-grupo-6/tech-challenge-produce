import { AxiosHttpClient } from '../../../../src/infra/http-client/axios'
import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let mockedAxios: jest.Mocked<typeof axios>

  beforeEach(() => {
    sut = new AxiosHttpClient()
    mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.create.mockReturnValue(mockedAxios)
  })

  it('should return the correct data', async () => {
    mockedAxios.get.mockResolvedValue({
      data: 'any_data'
    })

    const result = await sut.get({ url: 'any_url' })
    expect(result).toBe('any_data')
  })
})