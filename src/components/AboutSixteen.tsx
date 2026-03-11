import Image from "next/image";

export function AboutSixteen() {
    return (
        <section id="st-about" className="relative min-h-screen flex items-center bg-white z-30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-24 flex items-center relative z-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

                    {/* Left side: Image with "16" Badge */}
                    <div id="st-child-home-story-image" className="relative">
                        <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl">
                            <Image
                                src="/images/mauritius-oberoi-royal.webp"
                                alt="Sixteen Travel Mauritius - Luxury Experience"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* The "16" Square - Refined Style */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-gold rounded-[2rem] shadow-2xl flex items-center justify-center text-pastel-cream">
                            <span className="text-7xl font-display leading-none">16</span>
                        </div>
                    </div>

                    {/* Right side: Content */}
                    <div id="st-child-home-story-content" className="space-y-8">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-pastel-gold text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
                                About Sixteen Travel
                            </span>
                            <h2 className="text-5xl md:text-6xl font-display text-brand-bronze leading-[1.1]">
                                Crafting Your <br /> Magical Moments
                            </h2>
                        </div>

                        <div className="text-muted-foreground text-lg leading-relaxed">
                            We are a passionate team of young professionals in the field of hospitality having the zeal and passion to make your magical moments in Mauritius, which undoubtedly reflects in our products and services being offered.
                        </div>

                        <div id="st-mission" className="pl-8 border-l-2 border-brand-gold/30">
                            <h3 className="text-2xl font-display text-brand-bronze mb-4">Our Mission</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We strive to make you live your dreams and passions by discovering our paradise island in the most Unique Way by creating a lifetime experience which you will always cherish throughout life!!!
                            </p>
                        </div>

                        <div className="text-muted-foreground leading-relaxed mb-10">
                            We believe in making things happen and always striving to make your experience unforgettable that will tumble through out existence by offering an impeccable service beyond your expectations.
                        </div>

                        <button 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                            className="bg-brand-gold text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand-gold/20 hover:scale-105 active:scale-95 transition-transform"
                        >
                            Request more info
                        </button>
                    </div>

                </div>
            </div>

            {/* Background elements to stay inline with site style */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-pastel-warm/30 -z-10" />
        </section>
    );
}
