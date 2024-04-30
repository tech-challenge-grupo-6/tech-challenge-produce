/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { type Middleware, type HttpResponse } from '../../presentation/protocols'
import { forbidden, ok, serverError } from '../../presentation/helpers'
import { AccessDeniedError } from '../../presentation/errors'
import { CognitoIdentityServiceProvider } from 'aws-sdk'

const identityServiceProvider = new CognitoIdentityServiceProvider({
  region: process.env.REGION ?? 'us-east-1'
})

export interface IUser {
  id: string
  email: string
  name: string
  cpf: string
}

export interface IAuthenticatedRequest extends Request {
  user?: IUser
}

export class AuthMiddleware implements Middleware {
  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { authorization } = request
      if (authorization) {
        const rawUser = await identityServiceProvider.getUser({ AccessToken: authorization }).promise()

        request.user = {
          id: rawUser.UserAttributes.find((attr) => attr.Name === 'sub')?.Value!,
          email: rawUser.UserAttributes.find((attr) => attr.Name === 'email')?.Value!,
          name: rawUser.UserAttributes.find((attr) => attr.Name === 'custom:name')?.Value!,
          cpf: rawUser.UserAttributes.find((attr) => attr.Name === 'custom:cpf')?.Value!
        }
        return ok({ user: request.user })
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      if (error.code === 'NotAuthorizedException') {
        return forbidden(new AccessDeniedError())
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    authorization?: string
    user?: IUser
  }
}
