"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TicketTiers from './TicketTiers'

// ── Validation ───────────────────────────────────────────────────────────────
const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email'),
  phone:   z.string().optional(),
  company: z.string().optional(),
  city:    z.string().min(2, 'Please enter your city'),       
  country: z.string().min(2, 'Please enter your country'),   
})

type FormData = z.infer<typeof schema>

function Field({ label, error, required, children }: {
  label: string; error?: string; required?: boolean; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/80 text-xs uppercase tracking-wider">
        {label} {required && <span className="text-blue-400">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

const inputClass =
  "w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all duration-200"

export default function RSVPForm() {
  const [step,        setStep]        = useState(1)
  const [ticketType,  setTicketType]  = useState('general')
  const [submitting,  setSubmitting]  = useState(false)
  const [submitted,   setSubmitted]   = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setServerError('')
    try {
      // POST to /api/rsvp/attendees — geocoding happens server-side
      const res = await fetch('/api/rsvp/attendees', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, ticketType }),
      })
      const json = await res.json()
      if (!res.ok) { setServerError(json.error || 'Something went wrong.'); return }
      setSubmitted(true)
    } catch {
      setServerError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-16 gap-6">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-2xl">✓</div>
        <div>
          <h3 className="text-white font-semibold text-2xl mb-2">You're in.</h3>
          <p className="text-white/40 text-sm">Check your email for confirmation.<br/>See you on April 7.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">

      {/* Step 1 — Ticket selection */}
      {step === 1 && (
        <div>
          <h3 className="text-white font-semibold text-center mb-2">Choose your ticket</h3>
          <p className="text-white/70 text-center mb-8">All tickets are free. Select the one that fits you.</p>
          <TicketTiers selected={ticketType} onSelect={setTicketType} />
          <button onClick={() => setStep(2)}
            className="mt-8 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95">
            Continue →
          </button>
        </div>
      )}

      {/* Step 2 — Personal details */}
      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <h3 className="text-white font-semibold text-xl mb-2">Your details</h3>
            <p className="text-white/70 text-sm mb-8">Almost there. Just a few details.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full name" required error={errors.name?.message}>
              <input {...register('name')} placeholder="Tim Cook" className={inputClass} />
            </Field>

            <Field label="Email" required error={errors.email?.message}>
              <input {...register('email')} type="email" placeholder="tim@apple.com" className={inputClass} />
            </Field>

            {/* ── City + Country — used for geocoding + map dot ── */}
            <Field label="City" required error={errors.city?.message}>
              <input {...register('city')} placeholder="Mumbai" className={inputClass} />
            </Field>

            <Field label="Country" required error={errors.country?.message}>
              <input {...register('country')} placeholder="India" className={inputClass} />
            </Field>

            <Field label="Phone" error={errors.phone?.message}>
              <input {...register('phone')} placeholder="+91 98765 43210" className={inputClass} />
            </Field>

            <Field label="Company / Organisation" error={errors.company?.message}>
              <input {...register('company')} placeholder="Apple Inc." className={inputClass} />
            </Field>
          </div>

          {/* Ticket summary */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/8">
            <span className="text-white/40 text-xs uppercase tracking-wider">Ticket</span>
            <div className="flex items-center gap-3">
              <span className="text-white text-sm font-medium capitalize">{ticketType}</span>
              <button type="button" onClick={() => setStep(1)}
                className="text-blue-400 text-xs hover:text-blue-300 transition-colors">Change</button>
            </div>
          </div>

          {serverError && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl py-3">
              {serverError}
            </p>
          )}

          <div className="flex gap-3 mt-2">
            <button type="button" onClick={() => setStep(1)}
              className="px-6 py-3.5 border border-white/10 text-white/50 hover:text-white text-sm font-medium rounded-full transition-all duration-200">
              ← Back
            </button>
            <button type="submit" disabled={submitting}
              className=" px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95">
              {submitting ? 'Registering...' : 'Complete registration'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}