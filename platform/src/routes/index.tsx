import { createFileRoute, Link } from '@tanstack/react-router'
import { Users, Heart, UserCheck, ShieldCheck, Star, ArrowRight, MessageCircle, Video } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const categories = [
  { icon: <Heart size={28} />, label: 'Individual Therapy', desc: 'One-on-one SUD counselling tailored to your recovery journey.', color: 'var(--teal-600)' },
  { icon: <Users size={28} />, label: 'Couples Therapy', desc: 'Rebuild trust and communication alongside your partner.', color: 'var(--amber-500)' },
  { icon: <UserCheck size={28} />, label: 'Teen Counselling', desc: 'Specialised support for adolescents (13–17) facing substance use challenges.', color: 'var(--teal-400)' },
  { icon: <ShieldCheck size={28} />, label: 'Group Sessions', desc: 'Peer-led recovery support groups facilitated by a UTC-certified counsellor.', color: 'var(--teal-700)' },
]

const features = [
  { icon: <MessageCircle size={22} />, title: 'Secure Messaging', desc: 'Chat with your therapist any time between sessions.' },
  { icon: <Video size={22} />, title: 'Video Sessions', desc: 'Face-to-face appointments from the comfort of your home.' },
  { icon: <ShieldCheck size={22} />, title: 'POPIA Compliant', desc: 'All data is encrypted and handled to the highest privacy standards.' },
]

const testimonials = [
  { name: 'Thabo M.', rating: 5, text: 'Rehab360 matched me with exactly the right counsellor. The UTC programme gave me real tools I still use every day.' },
  { name: 'Lerato K.', rating: 5, text: 'Booking was effortless and my therapist was available within 48 hours. This service saved my relationship.' },
  { name: 'Sipho D.', rating: 5, text: 'The teen counselling programme helped my son open up in ways family therapy hadn\'t managed in months.' },
]

function Stars({ n }: { n: number }) {
  return (
    <span style={{ color: 'var(--amber-500)', display: 'flex', gap: '2px' }}>
      {Array.from({ length: n }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
    </span>
  )
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--teal-900) 0%, var(--teal-700) 100%)',
        color: 'var(--white)',
        padding: '6rem 0 5rem',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge-amber" style={{ marginBottom: '1.25rem' }}>
            UTC-Certified Counsellors · HWSETA Accredited
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
            Find the right therapist.<br />Start your recovery today.
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--teal-100)', maxWidth: '560px', margin: '0 auto 2rem' }}>
            Rehab360 connects you with SAQA/HWSETA-accredited substance use disorder counsellors for individual, couples, and teen therapy — online or in-person.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/questionnaire" className="btn btn-secondary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
              Get Matched Free <ArrowRight size={18} />
            </Link>
            <Link to="/therapists" className="btn btn-outline" style={{ fontSize: '1rem', padding: '0.875rem 2rem', borderColor: 'var(--teal-400)', color: 'var(--teal-100)' }}>
              Browse Therapists
            </Link>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--teal-400)' }}>
            No credit card required · Cancel anytime · POPIA compliant
          </p>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--neutral-900)' }}>
            Therapy for every need
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--neutral-600)', marginBottom: '3rem' }}>
            Choose the type of support that fits your situation.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
            {categories.map(cat => (
              <Link to="/questionnaire" key={cat.label} className="card" style={{
                padding: '1.75rem', display: 'block',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
              >
                <span style={{ color: cat.color, display: 'block', marginBottom: '1rem' }}>{cat.icon}</span>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--neutral-900)' }}>{cat.label}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', lineHeight: 1.5 }}>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: 'var(--teal-50)', padding: '5rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '1.875rem', fontWeight: 700, marginBottom: '3rem', color: 'var(--neutral-900)' }}>
            How Rehab360 works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { step: '01', title: 'Answer a few questions', desc: 'Tell us about your needs and goals. Takes under 3 minutes.' },
              { step: '02', title: 'Get matched instantly', desc: 'We surface UTC-certified counsellors that fit your profile.' },
              { step: '03', title: 'Book your first session', desc: 'Choose online (video/chat) or an in-person appointment.' },
              { step: '04', title: 'Begin your recovery', desc: 'Follow your personalised UTC-based treatment plan.' },
            ].map(item => (
              <div key={item.step} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--teal-600)', color: 'var(--white)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '1rem', margin: '0 auto 1rem',
                }}>{item.step}</div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--neutral-900)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {features.map(f => (
            <div key={f.title} className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--teal-600)', flexShrink: 0, marginTop: '2px' }}>{f.icon}</span>
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.35rem', color: 'var(--neutral-900)' }}>{f.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section style={{ background: 'var(--teal-900)', color: 'var(--white)', padding: '5rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Real stories, real recovery
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--teal-300)', marginBottom: '3rem' }}>
            Join 2,400+ members on their journey to recovery.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Stars n={t.rating} />
                <p style={{ margin: '0.85rem 0', fontSize: '0.9375rem', color: 'var(--teal-100)', lineHeight: 1.6 }}>"{t.text}"</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--teal-400)' }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--neutral-900)' }}>
            Ready to take the first step?
          </h2>
          <p style={{ color: 'var(--neutral-600)', marginBottom: '2rem', fontSize: '1.0625rem' }}>
            Answer a few questions and meet your matched counsellor — free of charge.
          </p>
          <Link to="/questionnaire" className="btn btn-primary" style={{ fontSize: '1.0625rem', padding: '1rem 2.5rem' }}>
            Start Matching <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
