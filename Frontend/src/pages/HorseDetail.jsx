import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'

export default function HorseDetail() {
    const { id } = useParams() //gets the id from the url
    const [horse, setHorse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [imgIndex, setImgIndex] = useState(0)
    /*
    The reason we can't just write useEffect(async () => {}) directly is that React doesn't
     allow useEffect to return a Promise — but async functions always return a Promise. */
    useEffect(() => {
        api.get(`/horses/${id}`)
            .then(res => setHorse(res.data))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <div className="pt-40 text-center text-gray-500">Loading...</div>
    if (!horse) return <div className="pt-40 text-center text-gray-500">Horse not found.</div>

    return (
        <div className="max-w-6xl mx-auto px-6 py-24">

            <Link to="/horses" className="text-xs tracking-widest text-gold uppercase hover:text-gold-light mb-10 inline-block">
                ← Back to Horses
            </Link>

            <div className="grid md:grid-cols-2 gap-12 mt-6">

               {/* Images */}
        <div>
        <div className="aspect-[4/3] bg-dark-card border border-dark-border overflow-hidden">
            {horse.images?.[0] ? (
            <img src={horse.images[imgIndex]} alt={horse.name} className="w-full h-full object-cover" />
            ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">🐴</div>
            )}
        </div>

        {/* Thumbnails */}
        {horse.images?.length > 1 && (
            <div className="flex gap-3 mt-4">
            {horse.images.map((img, i) => (
                <button key={i} onClick={() => setImgIndex(i)}
                className={`w-20 h-16 overflow-hidden border transition-colors ${i === imgIndex ? 'border-gold' : 'border-dark-border hover:border-gray-500'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
            ))}
            </div>
        )}
        </div>

                {/* Info */}
                <div className="flex flex-col justify-center">
                    <p className="text-xs tracking-[0.4em] text-gold uppercase mb-2">{horse.breed}</p>
                    <h1 className="font-serif text-5xl text-cream">{horse.name}</h1>
                    <div className="w-16 h-px bg-gold my-4" />
                    <p className="text-gray-500 text-sm">{horse.age} years old</p>
                    <p className="text-gray-300 mt-6 leading-relaxed">{horse.description}</p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                        <Link to={`/inquire/${horse._id}`} className="bg-gold text-dark font-semibold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold-light transition-colors text-center">
                            Inquire to Buy
                        </Link>
                        <Link to="/book" className="border border-gold text-gold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold hover:text-dark transition-colors text-center">
                            Book a Training Day
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
} 