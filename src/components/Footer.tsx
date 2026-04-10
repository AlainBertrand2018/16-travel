"use client";
import { useState } from "react";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { LegalModal, LegalContent } from "./LegalModals";

export function Footer() {
    const [legalState, setLegalState] = useState<{ isOpen: boolean; title: string; content: React.ReactNode }>({
        isOpen: false,
        title: "",
        content: null
    });

    const openLegal = (type: 'privacy' | 'terms') => {
        setLegalState({
            isOpen: true,
            title: type === 'privacy' ? 'Privacy Policy' : 'Terms of Service',
            content: type === 'privacy' ? LegalContent.privacy : LegalContent.terms
        });
    };

    return (
        <footer id="st-section-global-footer" className="bg-pastel-gold border-t border-brand-gold/10 text-brand-bronze py-24 px-6 md:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                <div id="st-child-global-footer-branding" className="space-y-8">
                    <Link href="/" className="text-3xl font-display font-bold tracking-tighter">
                        SIXTEEN<span className="text-brand-gold">.</span>TRAVEL
                    </Link>
                    <p className="text-muted-foreground leading-relaxed">
                        Redefining luxury travel in Mauritius through bespoke experiences and unparalleled service quality since 2016.
                    </p>
                    <div id="st-child-global-footer-socials" className="flex space-x-4">
                        {[
                            { Icon: Instagram, href: "#" },
                            { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61562025393976" },
                            { Icon: Twitter, href: "#" }
                        ].map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target={href !== "#" ? "_blank" : undefined}
                                rel={href !== "#" ? "noopener noreferrer" : undefined}
                                className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <div id="st-child-global-footer-links">
                    <h4 className="font-display text-xl mb-8 text-brand-bronze">Navigation</h4>
                    <ul className="space-y-4 text-muted-foreground font-medium">
                        {[
                            { name: "Transfers", href: "/#st-transfers" },
                            { name: "Tours", href: "/tours" },
                            { name: "Activities", href: "/activities" },
                            { name: "Signature", href: "/#st-cherry-picks" }
                        ].map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="hover:text-brand-gold transition-colors">{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-display text-xl mb-8 text-brand-bronze">Contact</h4>
                    <ul className="space-y-6 text-muted-foreground font-medium">
                        <li className="flex items-center gap-4">
                            <Mail className="w-5 h-5 text-brand-gold" />
                            <span>contact@sixteen-travel.com</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Phone className="w-5 h-5 text-brand-gold" />
                            <span>+230 5819 1502</span>
                        </li>
                        <li className="flex items-center gap-4 border border-brand-gold/10 p-4 rounded-2xl bg-white/50 shadow-sm">
                            <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                            <span className="text-sm">Sixteen Car Rental Ltd <br /> Belvédère, Mauritius</span>
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

            <div id="st-child-global-footer-legal" className="max-w-7xl mx-auto mt-24 pt-8 border-t border-brand-gold/10 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground/50 text-[10px] uppercase tracking-widest font-bold">
                <p>
                    © 2026 SIXTEEN TRAVEL • By <a href="https://www.digiverse.mu" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Digiverse Ltd.</a> • Powered by <a href="https://www.business-studio-ai.online" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Business Studio AI</a>
                </p>
                <div className="flex gap-8">
                    <button onClick={() => openLegal('privacy')} className="hover:text-brand-gold transition-colors">Privacy Policy</button>
                    <button onClick={() => openLegal('terms')} className="hover:text-brand-gold transition-colors">Terms of Service</button>
                </div>
            </div>

            <LegalModal
                isOpen={legalState.isOpen}
                onClose={() => setLegalState(prev => ({ ...prev, isOpen: false }))}
                title={legalState.title}
                content={legalState.content}
            />
        </footer>
    );
}
