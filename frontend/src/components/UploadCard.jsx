import React from 'react'
import { toast } from 'react-toastify'

export function UploadCard({ preview, onPickImage, removeImage, style, setStyle, styles }) {
  return (
    <section className="bg-white/80 rounded-2xl shadow-md  p-5">
      <h2 className="text-xl font-semibold mb-3">Upload Your Image ✨</h2>
      <div className="border-2 border-dashed rounded-xl p-4 grid place-items-center min-h-64">
        {preview ? (
          <div className="w-full flex flex-col items-center">
            <img src={preview} alt="preview" className="max-h-72 rounded-md object-contain" />
            <button className="mt-3 bg-rose-500 text-white px-4 py-1.5 rounded-md cursor-pointer hover:bg-rose-600" onClick={() => {
              removeImage();
              toast.success('Image removed');
            }}>
              Remove Image
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="text-5xl">📤</div>
            <div className="text-sm text-slate-500">Click to upload an image</div>
            <input type="file" accept="image/*" className="hidden" onChange={onPickImage} />
          </label>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm mb-1">Caption Style</label>
        <select
          className="w-full border rounded-lg px-3 py-2 bg-white"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          {styles.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </section>
  )
}
