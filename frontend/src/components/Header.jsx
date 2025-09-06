import React from 'react'

export default function Header({ onOpenAuth }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80    shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span>🖼️</span>
          <span>AI Caption Generator</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-md border text-sm text-white cursor-pointer bg-violet-600 "
            onClick={onOpenAuth}
          >
            Login / Register
          </button>
        </div>
      </div>
    </header>
  )
}
