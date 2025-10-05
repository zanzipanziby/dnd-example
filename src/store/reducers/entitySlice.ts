import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { entitiesActions } from './actions.ts'
import type { Entity } from '../../api/types.ts'

const slice = createSlice({
  name: 'entities',
  initialState: [] as Entity[],
  reducers: {
    updateEntitiesSorting: (
      _,
      { payload: { newEntities } }: PayloadAction<{ newEntities: Entity[] }>
    ) => {
      return newEntities
    },
  },
  extraReducers: (builder) => {
    builder.addCase(entitiesActions.getEntities.fulfilled, (_, action) => {
      return action.payload
    })
  },
})

export const entitiesReducer = slice.reducer
export const { updateEntitiesSorting } = slice.actions
