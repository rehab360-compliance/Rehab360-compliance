import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

export const Route = createFileRoute('/questionnaire')({
  component: QuestionnairePage,
})

interface Step {
  id: string
  question: string
  options: { label: string; value: string }[]
  multi?: boolean
}

const STEPS: Step[] = [
  {
    id: 'category',
    question: 'What kind of support are you looking for?',
    options: [
      { label: 'Individual therapy', value: 'individual' },
      { label: 'Couples therapy', value: 'couples' },
      { label: 'Teen counselling (13–17)', value: 'teen' },
      { label: 'Group recovery sessions', value: 'group' },
    ],
  },
  {
    id: 'concerns',
    question: 'Which concerns are most important to you? (select all that apply)',
    multi: true,
    options: [
      { label: 'Substance use / addiction', value: 'substance' },
      { label: 'Co-occurring mental health (COD)', value: 'cod' },
      { label: 'Trauma / PTSD', value: 'trauma' },
      { label: 'Relationship issues', value: 'relationship' },
      { label: 'Anxiety or depression', value: 'anxiety' },
      { label: 'Relapse prevention', value: 'relapse' },
    ],
  },
  {
    id: 'modality',
    question: 'How would you prefer to meet your therapist?',
    options: [
      { label: 'Video sessions', value: 'video' },
      { label: 'Chat / messaging', value: 'chat' },
      { label: 'In-person (Johannesburg)', value: 'inperson-jhb' },
      { label: 'In-person (Cape Town)', value: 'inperson-cpt' },
      { label: 'No preference', value: 'any' },
    ],
  },
  {
    id: 'urgency',
    question: 'When do you want to start?',
    options: [
      { label: 'As soon as possible', value: 'asap' },
      { label: 'Within the next week', value: 'week' },
      { label: 'Within the next month', value: 'month' },
      { label: "I'm just exploring for now", value: 'exploring' },
    ],
  },
]

export default function QuestionnairePage() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [submitted, setSubmitted] = useState(false)

  const step = STEPS[stepIndex]
  const progress = ((stepIndex) / STEPS.length) * 100

  function select(value: string) {
    if (step.multi) {
      const prev = (answers[step.id] as string[] | undefined) ?? []
      const next = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      setAnswers(a => ({ ...a, [step.id]: next }))
    } else {
      setAnswers(a => ({ ...a, [step.id]: value }))
    }
  }

  function isSelected(value: string) {
    const ans = answers[step.id]
    if (step.multi) return Array.isArray(ans) && ans.includes(value)
    return ans === value
  }

  function canAdvance() {
    const ans = answers[step.id]
    if (!ans) return false
    if (step.multi) return Array.isArray(ans) && ans.length > 0
    return true
  }

  function next() {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(i => i + 1)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="card" style={{ maxWidth: 520, width: '100%', padding: '3rem', textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--teal-100)', color: 'var(--teal-600)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <Check size={36} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--neutral-900)' }}>
            Great — we found your matches!
          </h2>
          <p style={{ color: 'var(--neutral-600)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Based on your answers we've matched you with 3 UTC-certified counsellors. View their profiles and book your first session.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button className="btn btn-primary" style={{ justifyContent: 'center', width: '100%' }}
              onClick={() => navigate({ to: '/therapists' })}>
              View My Matches <ChevronRight size={18} />
            </button>
            <button className="btn btn-ghost" style={{ justifyContent: 'center', width: '100%' }}
              onClick={() => navigate({ to: '/dashboard' })}>
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      {/* Progress */}
      <div style={{ width: '100%', maxWidth: 560, marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--neutral-600)' }}>
          <span>Step {stepIndex + 1} of {STEPS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div style={{ height: 6, background: 'var(--neutral-200)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--teal-500)', borderRadius: 999, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      <div className="card" style={{ maxWidth: 560, width: '100%', padding: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.75rem', color: 'var(--neutral-900)', lineHeight: 1.3 }}>
          {step.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {step.options.map(opt => (
            <button key={opt.value}
              onClick={() => select(opt.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.875rem 1.125rem',
                borderRadius: 'var(--radius-md)',
                border: isSelected(opt.value) ? '2px solid var(--teal-500)' : '2px solid var(--neutral-200)',
                background: isSelected(opt.value) ? 'var(--teal-50)' : 'var(--white)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.9375rem',
                fontWeight: isSelected(opt.value) ? 600 : 400,
                color: isSelected(opt.value) ? 'var(--teal-700)' : 'var(--neutral-700)',
                transition: 'all 0.15s',
              }}>
              <span style={{
                width: 20, height: 20, borderRadius: step.multi ? 'var(--radius-sm)' : '50%',
                border: isSelected(opt.value) ? 'none' : '2px solid var(--neutral-300)',
                background: isSelected(opt.value) ? 'var(--teal-500)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {isSelected(opt.value) && <Check size={12} color="white" strokeWidth={3} />}
              </span>
              {opt.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-ghost"
            onClick={() => setStepIndex(i => Math.max(0, i - 1))}
            disabled={stepIndex === 0}
            style={{ opacity: stepIndex === 0 ? 0.4 : 1 }}>
            <ChevronLeft size={18} /> Back
          </button>
          <button className="btn btn-primary"
            onClick={next}
            disabled={!canAdvance()}
            style={{ opacity: canAdvance() ? 1 : 0.45 }}>
            {stepIndex === STEPS.length - 1 ? 'Find My Matches' : 'Continue'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
