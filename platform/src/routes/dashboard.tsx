import { createFileRoute, Link } from '@tanstack/react-router'
import { Video, MessageCircle, Calendar, BookOpen, Award, ChevronRight, Clock } from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

const UPCOMING = [
  { date: 'Fri 28 Feb', time: '10:00', type: 'video', therapist: 'Dr. Nomsa Dlamini', module: 'Module 5 – CBT' },
  { date: 'Fri 7 Mar', time: '10:00', type: 'chat', therapist: 'Dr. Nomsa Dlamini', module: 'Module 6 – Relapse Prevention' },
]

const RESOURCES = [
  { icon: <BookOpen size={18} />, title: 'UTC Module 5: CBT Workbook', desc: 'Exercises for next session', tag: 'PDF' },
  { icon: <Award size={18} />, title: 'Module 4 Completion Certificate', desc: 'NQF Level 4 credit', tag: 'Certificate' },
  { icon: <BookOpen size={18} />, title: 'Relapse Prevention Plan Template', desc: 'Complete before Fri 28 Feb', tag: 'Template' },
]

export default function DashboardPage() {
  return (
    <div style={{ padding: '2.5rem 0 5rem', background: 'var(--neutral-50)', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.25rem' }}>
            Welcome back, Thabo 👋
          </h1>
          <p style={{ color: 'var(--neutral-600)' }}>Week 6 of your personalised UTC recovery programme.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {/* Active therapist card */}
          <div className="card" style={{ padding: '1.75rem', gridColumn: 'span 2' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--teal-600)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Your Counsellor</p>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--teal-500), var(--teal-800))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem', fontWeight: 700, color: 'var(--white)',
                flexShrink: 0,
              }}>ND</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--neutral-900)' }}>Dr. Nomsa Dlamini</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--neutral-500)' }}>Clinical Psychologist · UTC Facilitator (NQF 5)</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--teal-600)', marginTop: '0.25rem', fontWeight: 500 }}>● Online now</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/chat" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.1rem' }}>
                  <MessageCircle size={16} /> Message
                </Link>
                <button className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '0.6rem 1.1rem' }}>
                  <Video size={16} /> Schedule Video
                </button>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--teal-600)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Programme Progress</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--neutral-800)' }}>UTC Modules</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--neutral-500)' }}>5 / 10 complete</span>
            </div>
            <div style={{ height: 10, background: 'var(--neutral-100)', borderRadius: 999, overflow: 'hidden', marginBottom: '1.25rem' }}>
              <div style={{ height: '100%', width: '50%', background: 'linear-gradient(90deg, var(--teal-400), var(--teal-600))', borderRadius: 999 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'Addiction as Disease', done: true },
                { label: 'Assessment', done: true },
                { label: 'Treatment Planning', done: true },
                { label: 'Motivational Interviewing', done: true },
                { label: 'CBT', done: true },
                { label: 'Relapse Prevention', done: false },
              ].map(m => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', background: m.done ? 'var(--teal-500)' : 'var(--neutral-200)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {m.done && <span style={{ color: 'var(--white)', fontSize: 10 }}>✓</span>}
                  </span>
                  <span style={{ color: m.done ? 'var(--neutral-700)' : 'var(--neutral-400)' }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming sessions */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--teal-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Upcoming Sessions</p>
              <Calendar size={16} color="var(--neutral-400)" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {UPCOMING.map(s => (
                <div key={s.date} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                  <div style={{ textAlign: 'center', background: 'var(--teal-50)', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.75rem', minWidth: 64, flexShrink: 0 }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--teal-600)', textTransform: 'uppercase' }}>{s.date.split(' ')[0]}</p>
                    <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--teal-800)' }}>{s.date.split(' ')[1]}</p>
                    <p style={{ fontSize: '0.65rem', color: 'var(--teal-500)' }}>{s.date.split(' ')[2]}</p>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <Clock size={13} color="var(--neutral-400)" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--neutral-800)' }}>{s.time}</span>
                      <span style={{ fontSize: '0.75rem', padding: '1px 7px', borderRadius: 999, background: 'var(--teal-100)', color: 'var(--teal-700)', fontWeight: 600 }}>
                        {s.type === 'video' ? '📹 Video' : '💬 Chat'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--neutral-500)' }}>{s.module}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="card" style={{ padding: '1.75rem', gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--teal-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Resources & Documents</p>
              <Link to="/therapists" style={{ fontSize: '0.8rem', color: 'var(--teal-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {RESOURCES.map(r => (
                <div key={r.title} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', borderRadius: 'var(--radius-md)', background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}>
                  <span style={{ color: 'var(--teal-600)' }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--neutral-800)' }}>{r.title}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>{r.desc}</p>
                  </div>
                  <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 999, background: 'var(--amber-100)', color: 'var(--amber-600)', fontWeight: 600 }}>{r.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
