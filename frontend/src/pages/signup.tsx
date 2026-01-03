import AuthForm from '@/components/AuthForm';
import { useRouter } from 'next/navigation';
import { signup } from '@/services/authService';

const SignupPage = () => {
  const router = useRouter(); // Placeholder for navigation

  const handleSignUp = async (email: string, password: string) => {
    try {
      await signup(email, password);
      alert('Sign up successful! Please log in.');
      router.push('/login');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <AuthForm isSignUp={true} onSubmit={handleSignUp} />
      </div>
    </div>
  );
};

export default SignupPage;
