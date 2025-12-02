import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      }
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Mailine magic link geldi! 📧 Kontrol et bebeğim!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold text-white mb-4">VOYNA</h1>
          <p className="text-purple-200 text-xl">Stok bittiğinde arayan tek uygulama 💜</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="E-posta adresin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-4 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-pink-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-5 rounded-2xl text-xl hover:scale-105 transition transform"
          >
            {loading ? 'Gönderiliyor...' : 'Magic Link Gönder 💫'}
          </button>
        </form>

        <p className="text-center text-purple-300 mt-8 text-sm">
          Şifresiz giriş • E-posta ile 3 saniyede içeri!
        </p>
      </div>
    </div>
  )
}
