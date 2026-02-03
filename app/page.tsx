// app/page.tsx - DEBERÍA SER ASÍ (Server Component)
import PublicLanding from './components/PublicLanding'
import SchemaMarkup from './components/SchemaMarkup'

export default function Home() {
  return (
    <>
      <SchemaMarkup />
      <PublicLanding />
    </>
  )
}