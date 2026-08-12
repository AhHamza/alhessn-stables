import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const submit = async () => {
        try {
            const res = await api.post('/user/login', form)
            localStorage.setItem('alhessn_token', res.data.token)
            navigate('/admin/dashboard')
        } catch {
            setError('Invalid email or password.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <span className="font-serif text-3xl text-gold">Al Hessn</span>
                    <p className="text-xs tracking-widest uppercase text-gray-500 mt-1">Admin Panel</p>
                </div>
                <div className="bg-dark-card border border-dark-border p-8 flex flex-col gap-5">
                    <input name="email" type="email" value={form.email} onChange={handle}
                        placeholder="Email" className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600" />
                    <input name="password" type="password" value={form.password} onChange={handle}
                        placeholder="Password" className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600" />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button onClick={submit}
                        className="bg-gold text-dark font-semibold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold-light transition-colors mt-2">
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}