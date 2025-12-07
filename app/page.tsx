import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { CheckCircle, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Manage tasks with <span className="text-indigo-600">clarity</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A simple, fast, and beautiful task tracker designed to help you stay organized and focused.
            Experience the flow of productivity.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/signup">
              <Button className="h-12 px-8 text-base">Get started</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="h-12 px-8 text-base">
                Log in <span aria-hidden="true">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Productivity First</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to stay on track
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Fast & Fluid
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Built for speed with instant interactions and smooth animations.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <CheckCircle className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Stay Organized
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Categorize tasks, filter by status, and keep your workspace clean.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Secure & Private
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Your data is protected with secure authentication and best practices.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
