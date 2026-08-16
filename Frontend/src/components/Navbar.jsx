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
                    <Link to="/inquire" className="bg-gold text-dark text-sm font-semibold px-7 py-2 tracking-widest uppercase hover:bg-gold-light transition-colors">
                        Buy a Horse
                    </Link>

                    {/* Admin */}
                    <Link
                        to="/admin/login"
                        title="Admin"
                        className="text-gray-600 hover:text-gold transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
                        </svg>
                    </Link>
                </div>

            </div>
        </nav>
    )
}