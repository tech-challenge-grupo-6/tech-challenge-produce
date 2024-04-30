import { type LoadSurveys } from '../../../domain/usecases'
import { type LoadSurveysRepository } from '../../../data/protocols'

export class DbLoadOrder implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<LoadSurveys.Result> {
    return this.loadSurveysRepository.loadAll(accountId)
  }
}
