import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="border-t border-dark-border mt-24">
            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

                {/* Brand */}
                <div>
                    <span className="font-serif text-2xl text-gold">Al Hessn</span>
                    <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                        A legacy of excellence in Arabian horsemanship. Breeding, training, and care of the finest horses.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">Navigate</h4>
                    <div className="flex flex-col gap-2">
                        {[
                            ['/', 'Home'],
                            ['/horses', 'Our Horses'],
                            ['/book', 'Book Training'],
                            ['/about', 'About'],
                            ['/contact', 'Contact'],
                        ].map(([to, label]) => (
                            <Link key={to} to={to} className="text-sm text-gray-400 hover:text-gold transition-colors">
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact info */}
                <div>
                    <h4 className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">Contact</h4>
                    <div className="flex flex-col gap-2 text-sm text-gray-400">
                        <span>info@alhessn.com</span>
                        <span>+20 100 000 0000</span>
                        <span>Cairo, Egypt</span>
                    </div>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t border-dark-border text-center py-6 text-xs text-gray-600 tracking-widest uppercase">
                © {new Date().getFullYear()} Al Hessn Stables. All rights reserved.
            </div>
        </footer>
    )
}