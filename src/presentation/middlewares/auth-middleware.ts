/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { type Middleware, type HttpResponse } from '../../presentation/protocols'
import { unauthorized, ok, serverError } from '../../presentation/helpers'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { type IUserCognito } from '../../domain/models'
import env from '../../main/config/env'

export interface IAuthenticatedRequest extends Request {
  user?: IUserCognito
}

export class AuthMiddleware implements Middleware {
  readonly identityServiceProvider: CognitoIdentityServiceProvider

  constructor () {
    this.identityServiceProvider = new CognitoIdentityServiceProvider({
      region: env.awsRegion
    })
  }

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const authorization = this.extractToken(request)
      if (authorization) {
        const rawUser = await this.identityServiceProvider.getUser({ AccessToken: authorization }).promise()

        request.user = {
          id: rawUser.UserAttributes.find((attr) => attr.Name === 'sub')?.Value!,
          email: rawUser.UserAttributes.find((attr) => attr.Name === 'email')?.Value!,
          name: rawUser.UserAttributes.find((attr) => attr.Name === 'custom:name')?.Value!,
          cpf: rawUser.UserAttributes.find((attr) => attr.Name === 'custom:cpf')?.Value!
        }
        return ok({ user: request.user })
      }
      return unauthorized()
    } catch (error) {
      if (error.code === 'NotAuthorizedException') {
        return unauthorized()
      }
      return serverError(error)
    }
  }

  extractToken (req: AuthMiddleware.Request): string | null {
    if (req.authorization && req.authorization.split(' ')[0] === 'Bearer') {
      return req.authorization.split(' ')[1]
    }
    return null
  }
}

export namespace AuthMiddleware {
  export type Request = {
    authorization?: string
    user?: IUserCognito
  }
}
