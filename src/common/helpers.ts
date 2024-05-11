import { Status } from '../domain/models'

export const getCorrectValueStatus = (status: string): string => {
  for (const [, value] of Object.entries(Status)) {
    if (value.toLowerCase() === status.toLowerCase()) {
      return value
    }
  }
  return status
}
