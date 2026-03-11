import Image from "next/image";
import { RequestBar } from "./RequestBar";

export function Hero() {
    return (
        <section id="st-hero" className="relative min-h-screen w-full z-40 bg-brand-bronze/5">
            {/* Cinematic Background (Static) */}
            <div id="st-child-home-hero-background" className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-brand-bronze/10 z-10" />
                <Image
                    src="https://sixteen-travel.vercel.app/images/hero-Background.jpg"
                    alt="Mauritius Luxury Backdrop"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
            </div>

            {/* Environmental Sun Glow (Static) */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 50% 30%, rgba(197, 160, 89, 0.15) 0%, transparent 70%)"
                }}
            />

            {/* Content */}
            <div className="relative z-20 min-h-screen flex flex-col items-center justify-between py-24 md:py-32 px-6 text-center">
                {/* Top: Badge */}
                <div id="st-child-home-hero-badge">
                    <p className="uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold text-white bg-brand-gold px-8 py-3 rounded-full shadow-2xl border border-white/20">
                        Exclusive Mauritius Experience
                    </p>
                </div>

                {/* Center: Headings */}
                <div className="flex-1 flex flex-col justify-center space-y-4 text-center items-center">
                    <div id="st-child-home-hero-heading" className="overflow-hidden">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display tracking-tight text-white drop-shadow-2xl leading-none">
                            Travel in
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display tracking-tight text-white drop-shadow-2xl">
                            <span className="font-light">Sublime</span> Style
                        </h1>
                    </div>
                </div>

                {/* Bottom: Floating Request Bar */}
                <div id="st-child-home-hero-booking-bar" className="w-full max-w-4xl pt-10">
                    <RequestBar />
                </div>
            </div>

            {/* Decorative Scroll Line (Static) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 h-20">
                <div className="w-px h-full bg-gradient-to-b from-brand-gold to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
            </div>
        </section>
    );
}
