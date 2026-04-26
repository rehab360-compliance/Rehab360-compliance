import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Phone, Video, MoreVertical } from 'lucide-react'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

interface Message {
  id: number
  from: 'member' | 'therapist'
  text: string
  time: string
  read: boolean
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, from: 'therapist', text: "Hi Thabo! Ready for our session today? I've reviewed your relapse prevention worksheet -- great work on identifying your triggers.", time: '09:48', read: true },
  { id: 2, from: 'member', text: "Thank you, Dr. Dlamini. I found the urge surfing exercise really helpful this week.", time: '09:51', read: true },
  { id: 3, from: 'therapist', text: "That's wonderful to hear. Urge surfing is one of the most effective tools from Module 6. Let's build on that today. Can you share one situation where you used it?", time: '09:52', read: true },
  { id: 4, from: 'member', text: "Sure -- on Wednesday evening I had a craving after a stressful call with my brother. Instead of acting on it I did the breathing exercise and wrote in my journal. The urge passed within about 15 minutes.", time: '09:55', read: true },
  { id: 5, from: 'therapist', text: "Excellent! That's exactly the pattern we want to reinforce. You identified the trigger (stress / family conflict), used coping tools, and the craving passed. That's real progress!", time: '09:57', read: false },
]

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function sendMessage() {
    const text = draft.trim()
    if (!text) return
    const newMsg: Message = { id: Date.now(), from: 'member', text, time: formatTime(new Date()), read: false }
    setMessages(m => [...m, newMsg])
    setDraft('')
    inputRef.current?.focus()

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(m => [...m, {
        id: Date.now() + 1,
        from: 'therapist',
        text: 'Thank you for sharing that. Let us explore this further -- how did you feel after the urge passed?',
        time: formatTime(new Date()),
        read: false,
      }])
    }, 1800)
  }

  return (
    <div style={{ height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', background: 'var(--neutral-50)' }}>
      {/* Chat header */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--neutral-200)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal-500), var(--teal-800))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--white)', fontSize: '0.9rem', flexShrink: 0 }}>
          ND
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, color: 'var(--neutral-900)', fontSize: '0.9375rem' }}>Dr. Nomsa Dlamini</p>
          <p style={{ fontSize: '0.78rem', color: 'var(--teal-500)' }}>Online &bull; Clinical Psychologist (UTC NQF 5)</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-ghost" style={{ padding: '0.5rem' }} title="Voice call"><Phone size={18} /></button>
          <button className="btn btn-primary" style={{ padding: '0.5rem 0.875rem', fontSize: '0.85rem' }} title="Video session"><Video size={18} /> Video</button>
          <button className="btn btn-ghost" style={{ padding: '0.5rem' }}><MoreVertical size={18} /></button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--neutral-400)', fontWeight: 600 }}>Today, 27 Feb 2026</div>

        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'member' ? 'flex-end' : 'flex-start', gap: '0.5rem', alignItems: 'flex-end' }}>
            {msg.from === 'therapist' && (
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal-500), var(--teal-800))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--white)', fontSize: '0.7rem', flexShrink: 0 }}>ND</div>
            )}
            <div style={{
              maxWidth: '65%', padding: '0.75rem 1rem',
              borderRadius: msg.from === 'member' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.from === 'member' ? 'var(--teal-600)' : 'var(--white)',
              color: msg.from === 'member' ? 'var(--white)' : 'var(--neutral-800)',
              boxShadow: 'var(--shadow-sm)',
              border: msg.from === 'therapist' ? '1px solid var(--neutral-200)' : 'none',
            }}>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.55 }}>{msg.text}</p>
              <p style={{ fontSize: '0.7rem', marginTop: '0.35rem', color: msg.from === 'member' ? 'rgba(255,255,255,0.65)' : 'var(--neutral-400)', textAlign: 'right' }}>{msg.time}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal-500), var(--teal-800))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--white)', fontSize: '0.7rem' }}>ND</div>
            <div style={{ padding: '0.75rem 1rem', borderRadius: '16px 16px 16px 4px', background: 'var(--white)', border: '1px solid var(--neutral-200)', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal-400)', animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Compose area */}
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--neutral-200)', padding: '1rem 1.5rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button className="btn btn-ghost" style={{ padding: '0.5rem', flexShrink: 0 }} title="Attach file">
            <Paperclip size={18} color="var(--neutral-500)" />
          </button>
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
            placeholder="Type a message..."
            style={{
              flex: 1, padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--neutral-200)',
              fontSize: '0.9375rem',
              outline: 'none',
              fontFamily: 'inherit',
              background: 'var(--neutral-50)',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--teal-500)')}
            onBlur={e => (e.target.style.borderColor = 'var(--neutral-200)')}
          />
          <button
            onClick={sendMessage}
            disabled={!draft.trim()}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1rem', flexShrink: 0, opacity: draft.trim() ? 1 : 0.5 }}>
            <Send size={18} />
          </button>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--neutral-400)', marginTop: '0.5rem', textAlign: 'center' }}>
          End-to-end encrypted &bull; POPIA compliant &bull; Session notes saved automatically
        </p>
      </div>

      <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:.4} 40%{transform:scale(1);opacity:1} }`}</style>
    </div>
  )
}
