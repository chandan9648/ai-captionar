import React from 'react'
import { QuickTips } from './QuickTips'
import {ToastContainer, toast } from 'react-toastify'

export function CaptionCard({ isLoading, imageFile, handleGenerate, caption, error }) {
  return (
    <section className="bg-white/80 rounded-2xl shadow-md p-5 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Generated Caption 🚀</h2>
      <div className="flex gap-3">
        <button
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md disabled:opacity-60 shadow-md cursor-pointer"
          onClick={() => {
            handleGenerate();
            toast.success('Caption generating...');
          }}
          disabled={isLoading || !imageFile}
        >
          {isLoading ? 'Generating…' : 'Generate Caption '}
         
        </button>
        {caption && (
          <button
            className="shadow-md px-3 py-2 rounded-md cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(caption);
              toast.success('Caption copied to clipboard');
            }}
          >
            Copy
          </button>
       
        )}
           <ToastContainer />
      </div>

      {error && (
        <div className="text-rose-600 text-sm border border-rose-200 bg-rose-50 px-3 py-2 rounded-md">{error}</div>
      )}

      {caption ? (
        <textarea
          className="min-h-40 w-full shadow-md rounded-lg p-3 bg-white"
          value={caption}
          readOnly
        />
      ) : (
        <div className="text-slate-500 text-sm">Your caption will appear here…</div>
      )}

      <QuickTips />
    </section>
  )
}
