import { redirect } from 'next/navigation'
import { ROUTES } from '@/src/lib/routes'

function Page() {
  redirect(ROUTES.POSTS)
}

export default Page
