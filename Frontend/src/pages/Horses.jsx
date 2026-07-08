import { useEffect, useState } from 'react'
import api from '../api/axios'
import HorseCard from '../components/HorseCard'

export default function Horses() {
    const [horses, setHorses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/horses')
            .then(res => setHorses(res.data))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">Al Hessn Stables</p>
                <h1 className="font-serif text-5xl text-cream">Our Horses</h1>
                <div className="w-16 h-px bg-gold mx-auto mt-4" />
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : horses.length === 0 ? (
                <p className="text-center text-gray-500">No horses listed yet.</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {horses.map(horse => (
                        <HorseCard key={horse._id} horse={horse} />
                    ))}
                </div>
            )}
        </div>
    )
}