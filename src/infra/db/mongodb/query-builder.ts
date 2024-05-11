export class QueryBuilder {
  private readonly query: Array<Record<string, object>> = []

  private addStep (step: string, data: object): this {
    this.query.push({
      [step]: data
    })
    return this
  }

  match (data: object): this {
    return this.addStep('$match', data)
  }

  group (data: object): this {
    return this.addStep('$group', data)
  }

  sort (data: object): this {
    return this.addStep('$sort', data)
  }

  unwind (data: object): this {
    return this.addStep('$unwind', data)
  }

  lookup (data: object): this {
    return this.addStep('$lookup', data)
  }

  project (data: object): this {
    return this.addStep('$project', data)
  }

  build (): object[] {
    return this.query
  }
}
