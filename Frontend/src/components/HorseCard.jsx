import { Link } from 'react-router-dom'

export default function HorseCard({ horse }) {
    return (

        /** PLAY WITH THE TAILWIND STYLES */

        <Link to={`/horses/${horse._id}`} className="block bg-dark-card border border-dark-border hover:border-gold transition-colors duration-300 group">

            {/* Image */}
            <div className="aspect-[4/3] bg-dark-border overflow-hidden">
                {horse.images?.[0] ? (
                    <img
                        src={horse.images[0]}
                        alt={horse.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                        🐴
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-6">
                <p className="text-gold text-xs tracking-widest uppercase">{horse.breed}</p>
                <h3 className="font-serif text-xl text-cream mt-1 group-hover:text-gold transition-colors">{horse.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{horse.age} years old</p>
                <p className="text-gray-400 text-sm mt-3 line-clamp-2">{horse.description}</p>
                <div className="mt-4 pt-4 border-t border-dark-border text-xs tracking-widest uppercase text-gold">
                    View Details →
                </div>
            </div>

        </Link>
    )
}