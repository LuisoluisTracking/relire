import { StepIndicator } from '@/components/onboarding/step-indicator'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight">Relire</h1>
          <p className="text-sm text-gray-500 mt-1">Configurons votre compte</p>
        </div>
        <StepIndicator />
        {children}
      </div>
    </div>
  )
}
