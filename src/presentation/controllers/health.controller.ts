import { type Controller, type HttpResponse } from '../../presentation/protocols'
import { serverError, ok } from '../helpers'

export class HealthController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    try {
      return ok({ message: 'API is running' })
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return serverError(error)
    }
  }
}
