/* eslint-disable @typescript-eslint/unbound-method */
import { AxiosHttpClient } from '../../../../src/infra/http-client/axios'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  test('Should return the correct data on success', async () => {
    const sut = new AxiosHttpClient()
    const url = 'any_url'
    const params = { any: 'param' }
    // Garantir que a resposta mockada contenha um objeto com a propriedade `data`
    const result = { data: 'any_data' }
    mockedAxios.get.mockResolvedValueOnce(result)
    const response = await sut.get({ url, params })
    // Ajustar para verificar a propriedade `data` da resposta, se necessário
    expect(response).toEqual('any_data')
  })
  test('Should return the correct data on success', async () => {
    const sut = new AxiosHttpClient()
    const url = 'any_url'
    const params = { any: 'param' }
    const result = { data: 'any_data' }
    mockedAxios.get.mockResolvedValueOnce(result)
    const data = await sut.get({ url, params })
    expect(data).toEqual('any_data')
  })

  test('Should throw if axios throws', async () => {
    const sut = new AxiosHttpClient()
    const url = 'any_url'
    const params = { any: 'param' }
    mockedAxios.get.mockRejectedValueOnce(new Error('axios error'))
    const promise = sut.get({ url, params })
    await expect(promise).rejects.toThrow('axios error')
  })
})
