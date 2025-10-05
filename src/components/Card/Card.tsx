import styles from './Card.module.css'
import type { Entity } from '../../api/types.ts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type CardProps = Entity

export const Card = ({ title, id }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <li>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={styles.container}
        style={style}
      >
        <p>{title}</p>
      </div>
    </li>
  )
}
