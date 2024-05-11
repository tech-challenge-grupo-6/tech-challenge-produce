import { QueryBuilder } from '../../../../src/infra/db/mongodb'

describe('QueryBuilder', () => {
  let queryBuilder: QueryBuilder

  beforeEach(() => {
    queryBuilder = new QueryBuilder()
  })

  test('should initialize with an empty query array', () => {
    expect(queryBuilder).toHaveProperty('query', [])
  })

  test('addStep should add a step to the query array', () => {
    const step = 'sampleStep'
    const data = { field: 'value' }
    const expectedQuery = [{ [step]: data }]

    queryBuilder.addStep(step, data) // Assuming addStep is made accessible for testing

    expect(queryBuilder.query).toEqual(expectedQuery)
  })

  test('match should add a $match step to the query array', () => {
    const data = { field: 'value' }
    const expectedQuery = [{ $match: data }]

    queryBuilder.match(data)

    expect(queryBuilder.query).toEqual(expectedQuery)
  })

  test('group should add a $group step to the query array', () => {
    const data = { _id: '$field', total: { $sum: 1 } }
    const expectedQuery = [{ $group: data }]

    queryBuilder.group(data)

    expect(queryBuilder.query).toEqual(expectedQuery)
  })
})
