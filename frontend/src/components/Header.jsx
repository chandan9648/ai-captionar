import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Header({ onLogout, isLoggedIn }) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80    shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span>🖼️</span>
          <span>AI Captionar</span>
        </div>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button
              className="px-3 py-1.5 rounded-md border text-sm text-white cursor-pointer bg-red-500 hover:bg-red-600"
              onClick={() => {
                onLogout();
                toast.success('Logged out successfully');
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="px-3 py-1.5 rounded-md border text-sm text-white cursor-pointer bg-violet-600 "
              onClick={() => navigate('/login')}
            >
              Login / Register
            </button>
          )}
          
        </div>
      </div>
    </header>
  )
}
