import { cookies } from 'next/headers'
import { HomeClient } from '@/components/HomeClient'

export default async function Home() {
  const cookieStore = await cookies()
  const variantCookie = cookieStore.get('ab-test-variant')

  // Default to 'A' if no cookie found (though middleware should set it)
  // Validate if it's a valid variant
  let variant: 'A' | 'B' | 'C' | 'D' = 'A'

  if (variantCookie && ['A', 'B', 'C', 'D'].includes(variantCookie.value)) {
    variant = variantCookie.value as 'A' | 'B' | 'C' | 'D'
  }

  return <HomeClient initialVariant={variant} />
}
