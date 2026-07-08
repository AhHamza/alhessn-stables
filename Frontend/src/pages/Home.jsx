import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/axios'
import HorseCard from '../components/HorseCard'

export default function Home() {
    const [horses, setHorses] = useState([])

    useEffect(() => {
        api.get('/horses')
            .then(res => setHorses(res.data.slice(0, 3)))
            .catch(() => { })
    }, [])
    return (
        <div>
            {/* Hero Section */}
            <section className="flex items-center justify-center text-center px-6 relative"
                style={{
                    backgroundImage: 'url(/hero.jpg)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#0a0a0a',
                    height: '600px',
                }}>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60" />
                <div className="max-w-3xl relative z-10">
                    <p className="text-xs tracking-[0.5em] text-gold uppercase mb-6">
                        Est. — Cairo, Egypt
                    </p>

                    <h1 className="font-serif text-5xl md:text-7xl text-cream leading-tight mb-6">
                        The Art of the <br />
                        <em className="text-gold">Arabian Horse</em>
                    </h1>

                    <div className="w-16 h-px bg-gold mx-auto my-6" />

                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
                        Centuries of heritage. A tradition of excellence. Discover our collection of thoroughbred Arabian horses.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                        <Link to="/horses" className="bg-gold text-dark font-semibold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold-light transition-colors">
                            View Our Horses
                        </Link>
                        <Link to="/book" className="border border-gold text-gold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold hover:text-dark transition-colors">
                            Book a Training Day
                        </Link>
                    </div>
                </div>
            </section>
            {/* Featured Horses */}
            {horses.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 py-24">
                    <div className="text-center mb-16">
                        <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">Our Collection</p>
                        <h2 className="font-serif text-4xl text-cream">Featured Horses</h2>
                        <div className="w-16 h-px bg-gold mx-auto mt-4" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {horses.map(horse => <HorseCard key={horse._id} horse={horse} />)}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/horses" className="border border-gold text-gold px-8 py-3 tracking-widest uppercase text-sm hover:bg-gold hover:text-dark transition-colors">
                            View All Horses
                        </Link>
                    </div>
                </section>
            )}
        </div>
    )
}