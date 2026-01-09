'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Assuming you will create this API in authService
import { forgotPassword } from '../../src/services/authService';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

//   const handleForgotPassword = async () => {
//     if (!email.trim()) {
//       alert('Please enter your email.');
//       return;
//     }

//     try {
//       await forgotPassword(email);
//       alert('Password reset instructions have been sent to your email.');
//       router.push('/login');
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         alert(error.message);
//       } else {
//         alert('Something went wrong.');
//       }
//     }
//   };

    const handleForgotPassword = async () => {
  if (!email.trim()) return alert("Please enter your email");
  try {
    const res = await forgotPassword(email);
    alert(res.message || "Reset link sent! Check your email.");
  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 transform transition-all duration-500 hover:scale-[1.03]">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
            Forgot Your Password?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your email address below and we'll send you instructions to reset your password.
          </p>
        </div>

        {/* Email Input */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleForgotPassword}
          className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition transform duration-300"
        >
          Send Reset Link
        </button>

        {/* Back to Login */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/login')}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition"
          >
            Back to Login
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
