import { useState } from 'react'
import api from '../api/axios'

export default function Contact() {
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
            await api.post('/inquiries', { ...form, type: 'contact' })
            setStatus('success')
            setForm({ senderName: '', senderEmail: '', senderPhone: '', message: '' })
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-24">
            <div className="text-center mb-12">
                <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">Get in Touch</p>
                <h1 className="font-serif text-4xl text-cream">Contact Us</h1>
                <div className="w-16 h-px bg-gold mx-auto mt-4" />
                <p className="text-gray-400 mt-4">We'd love to hear from you.</p>
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
                    <p className="text-green-400 text-sm">✓ Message sent! We'll get back to you soon.</p>
                )}
                {status === 'error' && (
                    <p className="text-red-400 text-sm">Please fill in all required fields.</p>
                )}

                <button onClick={submit}
                    className="bg-gold text-dark font-semibold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold-light transition-colors mt-2">
                    Send Message
                </button>
            </div>
        </div>
    )
}