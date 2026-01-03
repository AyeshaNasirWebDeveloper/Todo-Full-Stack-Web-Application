import AuthForm from '@/components/AuthForm';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';

const LoginPage = () => {
  const router = useRouter(); // Placeholder for navigation

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      console.log('Login successful', response);
      alert('Login successful!');
      // Here you would store the token (e.g., in localStorage or HttpOnly cookie)
      // For now, redirect to tasks page
      router.push('/tasks');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <AuthForm isSignUp={false} onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
