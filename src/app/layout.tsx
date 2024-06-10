import type { ReactNode } from 'react'
import { StoreProvider } from './StoreProvider'

import '@/src/styles/globals.css'

type Props = {
  children: ReactNode
}

export const metadata = {
  title: 'Test title',
  description: 'Test description',
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </StoreProvider>
  )
}
