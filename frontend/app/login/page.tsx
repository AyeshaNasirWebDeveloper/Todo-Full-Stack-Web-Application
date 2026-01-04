'use client';

import AuthForm from '../../src/components/AuthForm';
import { useRouter } from 'next/navigation';
import { login } from '../../src/services/authService';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);

      console.log('Login successful:', response);

      // TODO: store token securely (cookie / context)
      router.push('/tasks');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Log in to your account
        </h2>

        <AuthForm isSignUp={false} onSubmit={handleLogin} />
      </div>
    </div>
  );
}