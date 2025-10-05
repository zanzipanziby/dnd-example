import { api } from './api.ts'
import type { Entity } from './types.ts'

export const entitiesApi = {
  async getEntities() {
    const res = await api.get<Entity[]>('entities')
    return res.data
  },
}
