import { type Controller } from '../../../presentation/protocols/'
import { GetHealthController } from '../../../presentation/controllers'

export const makeHealthController = (): Controller => {
  const controller = new GetHealthController()
  return controller
}
