import { makeHealthController } from '../../../../src/main/factories/'
import { GetHealthController } from '../../../../src/presentation/controllers'

describe('makeHealthController Factory', () => {
  it('should create a GetHealthController', () => {
    const controller = makeHealthController()
    expect(controller).toBeInstanceOf(GetHealthController)
  })
})
