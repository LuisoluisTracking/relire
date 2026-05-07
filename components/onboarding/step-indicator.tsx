'use client'

import { usePathname } from 'next/navigation'

const STEPS = [
  { label: 'Import', path: '/onboarding/import' },
  { label: 'Genres', path: '/onboarding/genres' },
  { label: 'Notes', path: '/onboarding/notes' },
  { label: 'Suivre', path: '/onboarding/follow' },
]

export function StepIndicator() {
  const pathname = usePathname()
  const currentIndex = STEPS.findIndex(s => s.path === pathname)

  if (currentIndex === -1) return null

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((step, i) => (
        <div key={step.path} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors"
              style={
                i < currentIndex
                  ? { background: '#002F45', color: 'white' }
                  : i === currentIndex
                  ? { background: 'white', color: '#002F45', border: '2px solid #002F45' }
                  : { background: 'white', color: '#9ca3af', border: '2px solid #e5e7eb' }
              }
            >
              {i < currentIndex ? '✓' : i + 1}
            </div>
            <span
              className="text-xs hidden sm:block"
              style={{ color: i <= currentIndex ? '#002F45' : '#9ca3af', fontWeight: i === currentIndex ? 600 : 400 }}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="w-8 h-px"
              style={{ background: i < currentIndex ? '#002F45' : '#e5e7eb' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
