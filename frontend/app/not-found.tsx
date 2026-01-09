'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-9xl font-extrabold text-indigo-600 mb-6 animate-bounce">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1"
        >
          Go to Homepage
        </button>
      </motion.div>

      {/* Decorative Animated Shapes */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity }}
      />
    </div>
  );
}
