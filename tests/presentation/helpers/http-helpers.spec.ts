import { badRequest, forbidden, unauthorized, serverError, ok, noContent, notFound } from '../../../src/presentation/helpers'
import { ServerError, UnauthorizedError } from '../../../src/presentation/errors'

describe('HTTP Helpers', () => {
  it('should return 400 if badRequest is called', () => {
    const httpResponse = badRequest(new Error())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toBeInstanceOf(Error)
  })

  it('should return 403 if forbidden is called', () => {
    const httpResponse = forbidden(new Error())
    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.body).toBeInstanceOf(Error)
  })

  it('should return 401 if unauthorized is called', () => {
    const httpResponse = unauthorized()
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toBeInstanceOf(UnauthorizedError)
  })

  it('should return 500 if serverError is called', () => {
    const httpResponse = serverError(new Error())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBeInstanceOf(ServerError)
  })

  it('should return 200 if ok is called', () => {
    const httpResponse = ok('any_data')
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe('any_data')
  })

  it('should return 204 if noContent is called', () => {
    const httpResponse = noContent()
    expect(httpResponse.statusCode).toBe(204)
    expect(httpResponse.body).toBe(null)
  })

  it('should return 404 if notFound is called', () => {
    const httpResponse = notFound('any_data')
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toBe('any_data')
  })
})
