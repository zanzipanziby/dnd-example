import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks.ts'
import { entitiesActions } from './store/reducers/actions.ts'
import { CardList } from './components/CardList/CardList.tsx'

export const App = () => {
  const dispatch = useAppDispatch()
  const entities = useAppSelector((state) => state.entities)
  console.log(entities)

  useEffect(() => {
    dispatch(entitiesActions.getEntities())
  }, [dispatch])

  if (!entities || !entities.length) {
    return <h2>List is empty</h2>
  }

  return <CardList items={entities} />
}
