import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

export default function Dashboard() {
    const [stats, setStats] = useState({ horses: 0, bookings: 0, inquiries: 0 })
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([ //fires all at the same time (and waits for all to finish at the same time),
            //instead of waiting for each one to finish seperately using(await)(slow)
            api.get('/horses'),
            api.get('/bookings'),
            api.get('/inquiries'),
        ]).then(([horses, bookings, inquiries]) => {
            setStats({
                horses: horses.data.length,
                bookings: bookings.data.length,
                inquiries: inquiries.data.length,
            })
        }).catch(() => { })
    }, [])

    const logout = () => {
        localStorage.removeItem('alhessn_token')
        navigate('/admin/login')
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-24">

            {/* Header */}
            <div className="flex items-center justify-between mb-16">
                <div>
                    <p className="text-xs tracking-[0.4em] text-gold uppercase mb-1">Admin Panel</p>
                    <h1 className="font-serif text-4xl text-cream">Dashboard</h1>
                </div>
                <button onClick={logout}
                    className="border border-dark-border text-gray-400 px-5 py-2 text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors">
                    Logout
                </button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
                {[
                    { label: 'Horses', value: stats.horses, link: '/admin/horses' },
                    { label: 'Bookings', value: stats.bookings, link: '/admin/bookings' },
                    { label: 'Inquiries', value: stats.inquiries, link: '/admin/inquiries' },
                ].map(({ label, value, link }) => (
                    <div key={label} onClick={() => navigate(link)}
                        className="bg-dark-card border border-dark-border p-8 cursor-pointer hover:border-gold transition-colors group">
                        <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">{label}</p>
                        <p className="font-serif text-5xl text-gold">{value}</p>
                        <p className="text-xs tracking-widest uppercase text-gray-600 mt-4 group-hover:text-gold transition-colors">
                            Manage →
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )
}