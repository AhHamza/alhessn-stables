import { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

export default function BuyInquiry() {
    const { horseId } = useParams()
    const [form, setForm] = useState({
        senderName: '',
        senderEmail: '',
        senderPhone: '',
        message: ''
    })
    const [status, setStatus] = useState(null)

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const submit = async () => {
        if (!form.senderName || !form.senderEmail || !form.message) {
            setStatus('error')
            return
        }
        try {
            await api.post('/inquiries', {
                ...form,
                type: 'purchase',
                horse: horseId || undefined // (undefined) if inquiry is from the (buy a horse) buuton
            })
            setStatus('success')
            setForm({ senderName: '', senderEmail: '', senderPhone: '', message: '' })
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-24">
            <div className="text-center mb-12">
                <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">Al Hessn Stables</p>
                <h1 className="font-serif text-4xl text-cream">Purchase Inquiry</h1>
                <div className="w-16 h-px bg-gold mx-auto mt-4" />
                <p className="text-gray-400 mt-4">Interested in one of our horses? Let us know.</p>
            </div>

            <div className="bg-dark-card border border-dark-border p-8 flex flex-col gap-5">
                <input name="senderName" value={form.senderName} onChange={handle}
                    placeholder="Full Name *" className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600" />
                <input name="senderEmail" type="email" value={form.senderEmail} onChange={handle}
                    placeholder="Email Address *" className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600" />
                <input name="senderPhone" value={form.senderPhone} onChange={handle}
                    placeholder="Phone Number" className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600" />
                <textarea name="message" value={form.message} onChange={handle}
                    placeholder="Your message *" rows={5}
                    className="w-full bg-dark border border-dark-border text-cream px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600 resize-none" />

                {status === 'success' && (
                    <p className="text-green-400 text-sm">✓ Inquiry submitted! We'll be in touch soon.</p>
                )}
                {status === 'error' && (
                    <p className="text-red-400 text-sm">Please fill in all required fields.</p>
                )}

                <button onClick={submit}
                    className="bg-gold text-dark font-semibold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold-light transition-colors mt-2">
                    Send Inquiry
                </button>
            </div>
        </div>
    )
}