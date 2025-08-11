import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Registerpage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) err.email = 'Enter a valid email';
    if (form.password.length < 6) err.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) err.confirm = 'Passwords do not match';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);

    setLoading(true);
    setSuccess(false);

    try {
      const res = await axios.post('http://localhost:3000/api/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });

      console.log('Register success:', res.data);
      setSuccess(true);
      setForm({ name: '', email: '', password: '', confirm: '' });

      // Navigate to login page after success
      navigate("/login");

    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      if (error.response?.data?.message) {
        setErrors({ api: error.response.data.message });
      } else {
        setErrors({ api: 'Something went wrong. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };


  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-pink-500 p-10">
          <div className="text-center max-w-md text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="mx-auto mb-6 w-40 h-40 opacity-90">
              <rect width="100%" height="100%" fill="none"></rect>
              <path fill="currentColor" d="M96 224c0-70.7 57.3-128 128-128h192c70.7 0 128 57.3 128 128v64c0 70.7-57.3 128-128 128H224c-70.7 0-128-57.3-128-128v-64z"></path>
            </svg>
            <h2 className="text-3xl font-bold">Join CoZA</h2>
            <p className="mt-3 text-sm opacity-95">Create your account and start exploring powerful features to boost your business.</p>

            <ul className="mt-6 text-left space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex-none bg-white/20 rounded-full p-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span>Fast onboarding</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-none bg-white/20 rounded-full p-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20l9-5-9-5-9 5 9 5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span>Beautiful dashboards</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-none bg-white/20 rounded-full p-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 10l5 5 5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span>Secure & reliable</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right - Form */}
        <div className="p-8 sm:p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 w-10 h-10 rounded-md flex items-center justify-center text-white font-bold">CZ</div>
              <h3 className="text-xl font-semibold">Create account</h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">Already have an account? <a href="#" className="text-indigo-600 dark:text-indigo-400 font-medium"><Link to="/login">Sign in</Link></a></div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {errors.api && <div className="p-3 rounded bg-red-50 text-red-800 text-sm">{errors.api}</div>}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full name</label>
              <input name="name" value={form.name} onChange={handleChange} className={`mt-1 block w-full rounded-lg border px-4 py-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.name ? 'ring-2 ring-red-400' : ''}`} placeholder="Your name" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email address</label>
              <input name="email" value={form.email} onChange={handleChange} className={`mt-1 block w-full rounded-lg border px-4 py-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.email ? 'ring-2 ring-red-400' : ''}`} placeholder="you@company.com" />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                <div className="relative mt-1">
                  <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} className={`block w-full rounded-lg border px-4 py-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.password ? 'ring-2 ring-red-400' : ''}`} placeholder="Create a password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2 px-2 py-1 text-sm text-gray-600 dark:text-gray-300">{showPassword ? 'Hide' : 'Show'}</button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Confirm</label>
                <input name="confirm" type={showPassword ? 'text' : 'password'} value={form.confirm} onChange={handleChange} className={`mt-1 block w-full rounded-lg border px-4 py-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.confirm ? 'ring-2 ring-red-400' : ''}`} placeholder="Repeat password" />
                {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input id="terms" type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">I agree to the <a href="#" className="text-indigo-600 dark:text-indigo-400">Terms & Conditions</a></label>
            </div>

            <div>
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-60">
                {loading ? 'Creating...' : 'Create account'}
              </button>
            </div>

            {success && <div className="p-3 rounded bg-green-50 text-green-800 text-sm">Account created! Welcome to CoZA.</div>}

            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-24 bg-gray-200 dark:bg-gray-700" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Or sign up with</span>
              <span className="h-px w-24 bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:outline-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.4v1.7H19l-.4 3h-2.6v7A10 10 0 0 0 22 12z" stroke="currentColor" strokeWidth="0.5"/></svg>
                Facebook
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:outline-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 5.5v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-13A2 2 0 0 1 4 3.5h16a2 2 0 0 1 2 2zM12 17v-8" stroke="currentColor" strokeWidth="0.5"/></svg>
                Google
              </button>
            </div>

            <p className="text-xs text-center text-gray-500">By signing up you agree to our <a href="#" className="text-indigo-600">terms</a> and <a href="#" className="text-indigo-600">privacy policy</a>.</p>
          </form>

          <footer className="mt-6 text-xs text-gray-400">CoZA • Crafted with care</footer>
        </div>
      </div>
    </div>
  )
}
