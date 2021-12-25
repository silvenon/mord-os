import { useState, useReducer } from 'react'
import Button from './Button'

interface Props {
  onSubmit: (options: { rememberMe: boolean }) => void
}

export default function Login({ onSubmit }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, toggleRememberMe] = useReducer((prev) => !prev, false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="m-auto">
      <div className="prose text-center">
        <h1>
          <span className="text-pink-700 border-t-4 border-current">
            Welcome to{' '}
          </span>
          <span className="inline-block px-2 py-[6px] text-white drop-shadow-md bg-pink-700 rounded-r-2xl">
            Mord OS
          </span>
        </h1>
        <p className="lead -mt-7 font-medium text-pink-700">
          The one OS to rule them all
        </p>
      </div>
      <form
        className="mt-8 bg-white shadow-lg p-6 -mx-6 rounded-lg space-y-6"
        aria-describedby={error ? 'form-error' : undefined}
        onSubmit={(event) => {
          event.preventDefault()
          if (
            email === import.meta.env.VITE_EMAIL &&
            password === import.meta.env.VITE_PASSWORD
          ) {
            onSubmit({ rememberMe })
          } else {
            setError('Invalid email or password')
          }
        }}
      >
        {error && (
          <p id="form-error" className="text-red-600 text-sm">
            {error}
          </p>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={() => toggleRememberMe()}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}
