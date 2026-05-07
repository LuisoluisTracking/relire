import { StepIndicator } from '@/components/onboarding/step-indicator'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-12" style={{ background: '#f5f4f0' }}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: '#002F45' }}>Relire</h1>
        </div>
        <StepIndicator />
        {children}
      </div>
    </div>
  )
}
