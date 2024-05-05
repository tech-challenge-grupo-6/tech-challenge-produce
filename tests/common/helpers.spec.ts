/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCorrectValueStatus } from '../../src/common/helpers'

describe('getCorrectValueStatus', () => {
  it('should return the correct status value', () => {
    const status = 'finalizado'
    const expectedStatus = 'Finalizado'
    const result = getCorrectValueStatus(status)
    expect(result).toEqual(expectedStatus)
  })

  it('should return the input status if it does not exist in Status', () => {
    const status = 'nonExistentStatus'
    const result = getCorrectValueStatus(status)
    expect(result).toEqual(status)
  })
})
