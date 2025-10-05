import type { Entity } from '../../api/types.ts'
import { Card } from '../Card/Card.tsx'
import styles from './CardList.module.css'
import { closestCorners, DndContext, type DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useAppDispatch } from '../../hooks/redux-hooks.ts'
import { updateEntitiesSorting } from '../../store/reducers/entitySlice.ts'
import { getItemPosition } from '../../utils/getItemPosition.ts'
import { createEntitiesMap } from '../../utils/createEntitiesMap.ts'

type CardListProps = {
  items: Entity[]
}

export const CardList = ({ items }: CardListProps) => {
  const dispatch = useAppDispatch()

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id) return

    if (active.id && over?.id) {
      const originalPosition = getItemPosition({ items, id: active.id })

      const newPosition = getItemPosition({ items, id: over.id })

      const newEntities = arrayMove(items, originalPosition, newPosition)
      console.log(newEntities)

      createEntitiesMap(newEntities)

      dispatch(updateEntitiesSorting({ newEntities }))
    }
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <ul className={styles.cardList}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <Card id={item.id} key={item.id} title={item.title} />
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  )
}
