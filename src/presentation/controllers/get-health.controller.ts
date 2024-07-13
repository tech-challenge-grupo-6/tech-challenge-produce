/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Controller, type HttpResponse } from '../protocols'
import { serverError, ok } from '../helpers'

export class GetHealthController implements Controller {
  async handle (): Promise<HttpResponse> {
    try {
      return ok({ message: 'API is running' })
    } catch (error: any) {
      return serverError(error)
    }
  }
}
