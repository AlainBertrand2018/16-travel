"use client";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-pastel-gold border-t border-brand-gold/10 text-brand-bronze py-24 px-6 md:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                <div className="space-y-8">
                    <Link href="/" className="text-3xl font-display font-bold tracking-tighter">
                        SIXTEEN<span className="text-brand-gold">.</span>TRAVEL
                    </Link>
                    <p className="text-muted-foreground leading-relaxed">
                        Redefining luxury travel in Mauritius through bespoke experiences and unparalleled service quality since 2016.
                    </p>
                    <div className="flex space-x-4">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all">
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-display text-xl mb-8 text-brand-bronze">Navigation</h4>
                    <ul className="space-y-4 text-muted-foreground font-medium">
                        {["Transfers", "Tours", "Activities", "Boutique", "Private Jet"].map((link) => (
                            <li key={link}>
                                <Link href="#" className="hover:text-brand-gold transition-colors">{link}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-display text-xl mb-8 text-brand-bronze">Contact</h4>
                    <ul className="space-y-6 text-muted-foreground font-medium">
                        <li className="flex items-center gap-4">
                            <Mail className="w-5 h-5 text-brand-gold" />
                            <span>hello@sixteen.travel</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Phone className="w-5 h-5 text-brand-gold" />
                            <span>+230 5555 1616</span>
                        </li>
                        <li className="flex items-center gap-4 border border-brand-gold/10 p-4 rounded-2xl bg-white/50 shadow-sm">
                            <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                            <span className="text-sm">Port Louis, Mauritius <br /> Business Studio AI Suite 16</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-display text-xl mb-8 text-brand-bronze">Newsletter</h4>
                    <p className="text-muted-foreground mb-6 text-sm">Join our inner circle for exclusive offers and travel inspiration.</p>
                    <form className="relative">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full bg-white border border-brand-gold/10 rounded-full py-4 px-6 text-sm focus:ring-1 focus:ring-brand-gold outline-none text-brand-bronze"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-brand-gold text-white px-6 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-bronze transition-colors">
                            Join
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-brand-gold/10 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground/50 text-[10px] uppercase tracking-widest font-bold">
                <p>© 2026 SIXTEEN TRAVEL. BY ALAIN BERTRAND.</p>
                <div className="flex gap-8">
                    <Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
