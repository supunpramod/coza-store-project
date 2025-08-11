import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Loginpage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setServerError('')
  }

  const validate = () => {
    const err = {}
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) err.email = 'Enter a valid email'
    if (!form.password) err.password = 'Password is required'
    return err
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) return setErrors(err)

    setLoading(true)
    setServerError('')
    try {
      const res = await axios.post('http://localhost:3000/api/login', form)
      setLoading(false)
      setSuccess(true)
      
      // Save token for future requests
      localStorage.setItem('token', res.data.token)

      // Redirect after a short delay
      setTimeout(() => navigate('/dashboard'), 1200)
    } catch (error) {
      setLoading(false)
      if (error.response) {
        setServerError(error.response.data.message || 'Login failed')
      } else {
        setServerError('Server is not responding')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-pink-500 p-10">
          <div className="text-center max-w-md text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="mx-auto mb-6 w-40 h-40 opacity-90">
              <rect width="100%" height="100%" fill="none"></rect>
              <path fill="currentColor" d="M96 224c0-70.7 57.3-128 128-128h192c70.7 0 128 57.3 128 128v64c0 70.7-57.3 128-128 128H224c-70.7 0-128-57.3-128-128v-64z"></path>
            </svg>
            <h2 className="text-3xl font-bold">Welcome Back to CoZA</h2>
            <p className="mt-3 text-sm opacity-95">Log in to continue and manage your business with our powerful tools.</p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 w-10 h-10 rounded-md flex items-center justify-center text-white font-bold">CZ</div>
              <h3 className="text-xl font-semibold">Sign in</h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              New here? <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-medium">Create account</Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email address</label>
              <input name="email" value={form.email} onChange={handleChange} className={`mt-1 block w-full rounded-lg border px-4 py-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.email ? 'ring-2 ring-red-400' : ''}`} placeholder="you@company.com" />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
              <div className="relative mt-1">
                <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} className={`block w-full rounded-lg border px-4 py-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.password ? 'ring-2 ring-red-400' : ''}`} placeholder="Your password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2 px-2 py-1 text-sm text-gray-600 dark:text-gray-300">{showPassword ? 'Hide' : 'Show'}</button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input id="remember" type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="remember" className="text-gray-600 dark:text-gray-300">Remember me</label>
              </div>
              <a href="#" className="text-indigo-600 dark:text-indigo-400">Forgot password?</a>
            </div>

            <div>
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-60">
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            {serverError && <div className="p-3 rounded bg-red-50 text-red-800 text-sm">{serverError}</div>}
            {success && <div className="p-3 rounded bg-green-50 text-green-800 text-sm">Login successful! Redirecting...</div>}

            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-24 bg-gray-200 dark:bg-gray-700" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Or sign in with</span>
              <span className="h-px w-24 bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:outline-none">Facebook</button>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:outline-none">Google</button>
            </div>
          </form>

          <footer className="mt-6 text-xs text-gray-400">CoZA • Crafted with care</footer>
        </div>
      </div>
    </div>
  )
}
