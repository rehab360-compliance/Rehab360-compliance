import { createRootRoute, Outlet, Link, useRouter } from '@tanstack/react-router'
import { Heart } from 'lucide-react'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const router = useRouter()
  const path = router.state.location.pathname

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: 'var(--teal-900)',
        color: 'var(--white)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={24} color="var(--amber-400)" fill="var(--amber-400)" />
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Rehab360</span>
          </Link>
          <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Link to="/therapists" style={{
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: path === '/therapists' ? 'var(--amber-400)' : 'var(--teal-100)',
              background: path === '/therapists' ? 'rgba(251,191,36,0.12)' : 'transparent',
            }}>Find Therapists</Link>
            <Link to="/dashboard" style={{
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: path === '/dashboard' ? 'var(--amber-400)' : 'var(--teal-100)',
              background: path === '/dashboard' ? 'rgba(251,191,36,0.12)' : 'transparent',
            }}>Dashboard</Link>
            <Link to="/questionnaire" className="btn btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.875rem' }}>
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer style={{ background: 'var(--teal-900)', color: 'var(--teal-100)', padding: '2.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={18} color="var(--amber-400)" fill="var(--amber-400)" />
            <span style={{ fontWeight: 600 }}>Rehab360</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--teal-400)' }}>
            Aligned to SAQA/HWSETA NQF Level 4 &amp; 5 — Universal Treatment Curriculum (UTC)
          </p>
        </div>
      </footer>
    </div>
  )
}
