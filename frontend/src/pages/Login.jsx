import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function Login({ onLogin }) {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const email = emailRef.current?.value.trim()
    const password = passwordRef.current?.value
    if (!email || !password) {
      setError('Enter email and password')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
      const data = await res.json().catch(()=> ({}))
      if (!res.ok) throw new Error(data?.message || 'Login failed')
      if (onLogin) {
        onLogin({ token: data?.token, user: data?.userId })
      }
      
      toast.success('Logged in successfully')
      navigate('/')
    } catch (err) {
      setError(err.message)
      toast.error('Login failed: ' + err.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
   
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl  shadow-xl">
        <div>
               <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
          <label className="block text-sm mb-1">Email</label>
          <input ref={emailRef} className="w-full border rounded-lg px-3 py-2" placeholder="your@email.com" />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input ref={passwordRef} type="password" className="w-full border rounded-lg px-3 py-2" placeholder="••••••••" />
        </div>
        {error && <div className="text-rose-600 text-sm">{error}</div>}
        <button disabled={loading} className="w-full bg-violet-600 text-white py-2 rounded-md disabled:opacity-60">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-sm text-center text-slate-600">No account? <Link className="text-violet-600 hover:underline" to="/register">Register</Link></p>
      </form>
    </div>
  )
}
