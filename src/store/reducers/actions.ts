import { createAsyncThunk } from '@reduxjs/toolkit'
import { entitiesApi } from '../../api/entitiesApi.ts'
import type { AxiosError } from 'axios'
import { storage } from '../../utils/localStorage.ts'
import { entitiesSortByIds } from '../../utils/createEntitiesMap.ts'

const getEntities = createAsyncThunk('entities/getEntities', async () => {
  try {
    const res = await entitiesApi.getEntities()
    const storedIds: number[] | null = storage.getItem('entities')
    console.log(storedIds)

    if (storedIds) {
      return entitiesSortByIds(res, storedIds)
    }
    return res
  } catch (e) {
    const error = e as Error | AxiosError
    console.error(error.message)
  }
})

export const entitiesActions = {
  getEntities,
}
