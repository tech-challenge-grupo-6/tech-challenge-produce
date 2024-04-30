import { type Controller } from '../../presentation/protocols'
import { type Request as ExpressRequest, type Response } from 'express'

interface Request extends ExpressRequest {
  user: any // ou substitua 'any' pelo tipo correto se você souber
}

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      user: req.user
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
