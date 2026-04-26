import { createFileRoute, Link } from '@tanstack/react-router'
import { Star, Video, MessageCircle, MapPin, ChevronRight, Filter } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/therapists')({
  component: TherapistsPage,
})

interface Therapist {
  id: number
  name: string
  title: string
  specialisms: string[]
  modalities: ('video' | 'chat' | 'inperson')[]
  rating: number
  reviews: number
  sessions: number
  location: string
  bio: string
  available: boolean
  utcModules: string[]
}

const THERAPISTS: Therapist[] = [
  {
    id: 1,
    name: 'Dr. Nomsa Dlamini',
    title: 'Clinical Psychologist · UTC Facilitator (NQF 5)',
    specialisms: ['Addiction', 'Trauma', 'COD', 'MI'],
    modalities: ['video', 'chat', 'inperson'],
    rating: 4.9, reviews: 148, sessions: 820,
    location: 'Johannesburg, GP',
    bio: 'With 12 years of experience in SUD treatment, I use a UTC-based approach integrating CBT, Motivational Interviewing, and trauma-informed care to support lasting recovery.',
    available: true,
    utcModules: ['MI', 'CBT', 'Relapse Prevention', 'Trauma-Informed Care'],
  },
  {
    id: 2,
    name: 'Sipho Khumalo',
    title: 'Substance Abuse Counsellor · NQF Level 5',
    specialisms: ['Substance Use', 'Relapse Prevention', 'MAT Support'],
    modalities: ['video', 'chat'],
    rating: 4.8, reviews: 96, sessions: 510,
    location: 'Cape Town, WC',
    bio: 'I specialize in helping clients navigate medication-assisted treatment alongside behavioural counselling, using the full UTC curriculum adapted for individual needs.',
    available: true,
    utcModules: ['Addiction as Disease', 'Treatment Planning', 'MAT', 'Relapse Prevention'],
  },
  {
    id: 3,
    name: 'Fatima Hendricks',
    title: 'Social Worker (SACSSP) · Peer Counsellor (NQF 4)',
    specialisms: ['Teen Counselling', 'Family Systems', 'Recovery Support'],
    modalities: ['video', 'inperson'],
    rating: 4.95, reviews: 72, sessions: 340,
    location: 'Durban, KZN',
    bio: 'I work primarily with adolescents and families, helping young people understand addiction, build resilience, and develop recovery support systems using UTC Module 10.',
    available: false,
    utcModules: ['Addiction as Disease', 'Assessment', 'Recovery Support Services'],
  },
  {
    id: 4,
    name: 'James van der Berg',
    title: 'Registered Counsellor (HPCSA) · UTC Facilitator',
    specialisms: ['Couples Therapy', 'Communication', 'Co-dependency'],
    modalities: ['video', 'chat', 'inperson'],
    rating: 4.7, reviews: 110, sessions: 680,
    location: 'Johannesburg, GP',
    bio: 'I focus on restoring relationships damaged by addiction, drawing on the UTC Treatment Planning and MI modules to involve both partners in the recovery process.',
    available: true,
    utcModules: ['MI', 'Treatment Planning', 'CBT', 'Co-occurring Disorders'],
  },
]

function ModalityBadge({ m }: { m: 'video' | 'chat' | 'inperson' }) {
  const map = { video: { icon: <Video size={12} />, label: 'Video' }, chat: { icon: <MessageCircle size={12} />, label: 'Chat' }, inperson: { icon: <MapPin size={12} />, label: 'In-Person' } }
  const { icon, label } = map[m]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 8px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, background: 'var(--teal-100)', color: 'var(--teal-700)' }}>
      {icon} {label}
    </span>
  )
}

export default function TherapistsPage() {
  const [filter, setFilter] = useState<'all' | 'video' | 'chat' | 'inperson'>('all')

  const filtered = filter === 'all' ? THERAPISTS : THERAPISTS.filter(t => t.modalities.includes(filter as 'video' | 'chat' | 'inperson'))

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>UTC-Certified Therapists</h1>
          <p style={{ color: 'var(--neutral-600)' }}>All counsellors are SAQA/HWSETA accredited and trained in the Universal Treatment Curriculum.</p>
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Filter size={16} color="var(--neutral-500)" />
          {(['all', 'video', 'chat', 'inperson'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="btn"
              style={{
                padding: '0.4rem 0.875rem', fontSize: '0.85rem',
                background: filter === f ? 'var(--teal-600)' : 'var(--white)',
                color: filter === f ? 'var(--white)' : 'var(--neutral-700)',
                border: filter === f ? 'none' : '1.5px solid var(--neutral-200)',
              }}>
              {f === 'all' ? 'All' : f === 'inperson' ? 'In-Person' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--neutral-500)' }}>{filtered.length} therapist{filtered.length !== 1 ? 's' : ''} found</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filtered.map(t => (
            <div key={t.id} className="card" style={{ padding: '1.75rem', display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: '1.25rem', alignItems: 'start' }}>
              {/* Avatar */}
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: `linear-gradient(135deg, var(--teal-${t.id % 2 === 0 ? 600 : 400}), var(--teal-${t.id % 2 === 0 ? 800 : 600}))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', fontWeight: 700, color: 'var(--white)',
                flexShrink: 0,
              }}>
                {t.name.split(' ').map(p => p[0]).slice(0, 2).join('')}
              </div>

              {/* Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                  <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--neutral-900)' }}>{t.name}</h2>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 999, fontWeight: 600, background: t.available ? 'var(--teal-100)' : 'var(--neutral-100)', color: t.available ? 'var(--teal-700)' : 'var(--neutral-500)' }}>
                    {t.available ? '● Available' : '○ Waitlist'}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--neutral-500)', marginBottom: '0.75rem' }}>{t.title}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.55, marginBottom: '0.875rem' }}>{t.bio}</p>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {t.specialisms.map(s => (
                    <span key={s} style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 999, background: 'var(--amber-100)', color: 'var(--amber-600)', fontWeight: 600 }}>{s}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {t.modalities.map(m => <ModalityBadge key={m} m={m} />)}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', color: 'var(--neutral-500)', marginLeft: '0.5rem' }}>
                    <MapPin size={12} /> {t.location}
                  </span>
                </div>
              </div>

              {/* Stats + CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem', minWidth: 140 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                    <Star size={14} fill="var(--amber-500)" color="var(--amber-500)" />
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{t.rating}</span>
                    <span style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>({t.reviews})</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--neutral-400)' }}>{t.sessions.toLocaleString()} sessions</p>
                </div>
                <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.1rem', width: '100%', justifyContent: 'center' }}>
                  Book <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
