/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Controller, type HttpResponse } from '../protocols'
import { serverError, ok } from '../helpers'
import { Get, Route, Tags, SuccessResponse } from 'tsoa'

@Route('healthcheck')
@Tags('health')
@SuccessResponse(200)
export class GetHealthController implements Controller {
  @Get('/')
  async handle (): Promise<HttpResponse> {
    try {
      return ok({ message: 'API is running' })
    } catch (error: any) {
      return serverError(error)
    }
  }
}
