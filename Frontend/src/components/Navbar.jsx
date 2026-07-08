import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark border-b border-dark-border">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

                {/* Logo */}
                <Link to="/" className="flex flex-col leading-none">
                    <span className="font-serif text-2xl text-gold">Al Hessn</span>
                    <span className="text-xs tracking-widest text-gray-500 uppercase">Stables</span>
                </Link>

                {/* Links */}
                <div className="flex items-center gap-8">
                    <Link to="/horses" className="text-sm tracking-widest uppercase text-gray-400 hover:text-cream transition-colors">
                        Our Horses
                    </Link>
                    <Link to="/book" className="text-sm tracking-widest uppercase text-gray-400 hover:text-cream transition-colors">
                        Book Training
                    </Link>
                    <Link to="/about" className="text-sm tracking-widest uppercase text-gray-400 hover:text-cream transition-colors">
                        About
                    </Link>
                    <Link to="/contact" className="text-sm tracking-widest uppercase text-gray-400 hover:text-cream transition-colors">
                        Contact
                    </Link>
                    <Link to="/inquire" className="bg-gold text-dark text-sm font-semibold px-7 py-2  tracking-widest uppercase hover:bg-gold-light transition-colors">
                        Buy a Horse
                    </Link>
                </div>

            </div>
        </nav>
    )
}