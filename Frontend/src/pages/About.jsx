export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <p className="text-xs tracking-[0.4em] text-gold uppercase mb-3">Our Story</p>
                <h1 className="font-serif text-4xl text-cream">About Al Hessn</h1>
                <div className="w-16 h-px bg-gold mx-auto mt-4" />
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">

                {/* Image placeholder */}
                <div className="aspect-square bg-dark-card border border-dark-border flex items-center justify-center">
                    <span className="text-8xl">🐴</span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-6 text-gray-400 leading-relaxed">
                    <p>
                        Al Hessn Stables is built on a deep love for the Arabian horse — one of the world's oldest and most noble breeds. Our stable is dedicated to preserving that heritage through careful breeding, expert training, and genuine care.
                    </p>
                    <p>
                        Every horse in our collection is raised with the highest standards of nutrition, exercise, and medical attention. We take pride in connecting passionate owners with horses that match their spirit.
                    </p>
                    <p>
                        Whether you're here to train, to observe, or to find a companion for life — you are welcome at Al Hessn.
                    </p>
                    <div className="w-16 h-px bg-gold" />
                    <p className="font-serif text-xl text-cream italic">
                        "A horse is the projection of peoples' dreams about themselves — strong, powerful, beautiful."
                    </p>
                </div>

            </div>
        </div>
    )
}