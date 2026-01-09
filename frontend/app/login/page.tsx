'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../src/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Please enter email and password.');
      return;
    }

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 transform transition-all duration-500 hover:scale-[1.03]">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
            Log in to Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="font-medium text-indigo-600 hover:text-indigo-700 transition"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Email & Password */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition transform duration-300"
        >
          Log In
        </button>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/forgot-password')}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition"
          >
            Forgot Password?
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-gray-200 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </div>
    </div>
  );
}
