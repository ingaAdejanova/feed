import type { ReactNode } from 'react'
import styles from './layout.module.css'

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return <section className={styles.container}>{children}</section>
}
