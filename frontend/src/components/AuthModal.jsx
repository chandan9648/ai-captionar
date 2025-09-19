import React, { useRef } from 'react'

export function AuthModal({ isOpen, onClose, authMode, setAuthMode, onSuccess, setError, error }) {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  if (!isOpen) return null

  async function handleAuthSubmit(e) {
    e?.preventDefault()
    const email = emailRef.current?.value?.trim()
    const password = passwordRef.current?.value
    if (!email || !password) {
      setError('Enter email and password')
      return
    }
    try {
      const res = await fetch(`https://ai-captionar.onrender.com/api/auth/${authMode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Auth failed')
      }
      setError('')
      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{authMode === 'login' ? 'Login' : 'Register'}</h3>
          <button className="text-slate-500" onClick={onClose}>✖</button>
        </div>
        <form className="space-y-3" onSubmit={handleAuthSubmit}>
          <div>
            <label className="block text-sm mb-1">email</label>
            <input ref={emailRef} className="w-full border rounded-lg px-3 py-2" placeholder="yourname" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input ref={passwordRef} type="password" className="w-full border rounded-lg px-3 py-2" placeholder="••••••••" />
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-md">
              {authMode === 'login' ? 'Login' : 'Create account'}
            </button>
            <button
              className="text-sm underline"
              type="button"
              onClick={() => setAuthMode((m) => (m === 'login' ? 'register' : 'login'))}
            >
              {authMode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
            </button>
          </div>
          {error && <div className="text-rose-600 text-sm">{error}</div>}
        </form>
      </div>
    </div>
  )
}
