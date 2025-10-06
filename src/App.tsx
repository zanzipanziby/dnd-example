import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks.ts'
import { entitiesActions } from './store/reducers/actions.ts'
import { CardList } from './components/CardList/CardList.tsx'
import { storage } from './utils/localStorage.ts'

export const App = () => {
  const dispatch = useAppDispatch()
  const entities = useAppSelector((state) => state.entities)

  const sortingMap = JSON.stringify(storage.getItem('entities')) || 'Empty'
  const entitiesIds =
    JSON.stringify(storage.getItem('server-sorting')) || 'Empty'

  useEffect(() => {
    dispatch(entitiesActions.getEntities())
  }, [dispatch])

  if (!entities || !entities.length) {
    return <h2>List is empty</h2>
  }

  return (
    <>
      <h3>Порядок с сервера: {entitiesIds}</h3>
      <br />
      <h3>Порядок на клиенте: {sortingMap}</h3>
      <br />
      <CardList items={entities} />
    </>
  )
}
