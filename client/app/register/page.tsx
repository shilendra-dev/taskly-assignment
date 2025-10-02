import { RegisterForm } from '@/components/features/auth/registerForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}