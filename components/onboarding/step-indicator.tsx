'use client'

import { usePathname } from 'next/navigation'

const STEPS = [
  { label: 'Profil', path: '/onboarding/profile' },
  { label: 'Genres', path: '/onboarding/genres' },
  { label: 'Mes livres', path: '/onboarding/import' },
]

export function StepIndicator() {
  const pathname = usePathname()
  const currentIndex = STEPS.findIndex(s => s.path === pathname)

  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {STEPS.map((step, i) => (
        <div key={step.path} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors ${
                i < currentIndex
                  ? 'bg-black text-white border-black'
                  : i === currentIndex
                  ? 'border-black text-black bg-white'
                  : 'border-gray-200 text-gray-400 bg-white'
              }`}
            >
              {i < currentIndex ? '✓' : i + 1}
            </div>
            <span className={`text-sm hidden sm:block ${i <= currentIndex ? 'text-black font-medium' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-6 h-px ${i < currentIndex ? 'bg-black' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
