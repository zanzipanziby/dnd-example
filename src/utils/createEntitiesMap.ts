import type { Entity } from '../api/types.ts'
import { storage } from './localStorage.ts'

export const createEntitiesMap = (entities: Entity[]) => {
  storage.setItem(
    'entities',
    entities.map((entity) => Number(entity.id))
  )
}

export const entitiesSortByIds = (entities: Entity[], idOrder: number[]) => {
  return [...entities].sort((a, b) => {
    const indexA = idOrder.indexOf(Number(a.id))
    const indexB = idOrder.indexOf(Number(b.id))
    return indexA - indexB
  })
}
