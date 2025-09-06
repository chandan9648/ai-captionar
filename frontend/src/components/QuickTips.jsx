import React from 'react'

export function QuickTips() {
  return (
    <div className="mt-4 bg-slate-50 shadow-sm rounded-xl p-4">
      <div className="font-medium mb-1">💡 Quick Tips</div>
      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
        <li>Upload clear, high quality images for better captions</li>
        <li>Try different styles to match your brand voice</li>
        <li>Use the copy button to quickly share on social media</li>
      </ul>
    </div>
  )
}
