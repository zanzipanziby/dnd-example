import type { PropsWithChildren } from 'react'
import styles from './MainLayout.module.css'

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Dnd Example</h1>
      {children}
    </div>
  )
}
