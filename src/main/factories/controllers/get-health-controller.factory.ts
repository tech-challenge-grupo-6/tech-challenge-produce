import { type Controller } from '../../../presentation/protocols/'
import { HealthController } from '../../../presentation/controllers'

export const makeHealthController = (): Controller => {
  const controller = new HealthController()
  return controller
}
