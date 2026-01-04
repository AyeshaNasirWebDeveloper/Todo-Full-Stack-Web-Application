import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Todo App
          </h1>

          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-5 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Organize Your Tasks Effortlessly
          </h2>

          <p className="text-gray-600 mb-8">
            A modern, secure and fast Todo application built with
            Next.js, FastAPI and JWT authentication.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
          © 2026 Todo App — Phase II
        </div>
      </footer>
    </main>
  );
}
