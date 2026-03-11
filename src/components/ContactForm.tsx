"use client";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Facebook } from "lucide-react";

export function ContactForm() {
    return (
        <section className="relative py-24 px-6 md:px-24" id="st-section-home-contact">
            {/* Layer 1: Background Plate */}
            <div className="absolute inset-0 bg-pastel-warm -z-20" />

            <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 id="st-child-home-contact-heading" className="text-5xl md:text-7xl font-display mb-8 text-brand-bronze">Get in <br /><span>Touch</span></h2>
                        <p id="st-child-home-contact-description" className="text-muted-foreground text-xl mb-12 max-w-md">
                            Whether you&apos;re planning a corporate retreat or a dream honeymoon, our dedicated team is at your disposal.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-center">
                                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-brand-gold shadow-sm">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">Office Address</p>
                                    <p className="font-medium text-brand-bronze">Sixteen Car Rental Ltd, Belvédère, Mauritius</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-brand-gold shadow-sm">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">Direct Email</p>
                                    <p className="font-medium text-brand-bronze">contact@sixteentravel.com</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-brand-gold shadow-sm">
                                     <Phone className="w-6 h-6" />
                                 </div>
                                 <div>
                                     <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">Call & Whatsapp</p>
                                     <p className="font-medium text-brand-bronze">+230 5819 1502</p>
                                 </div>
                            </div>
                            <div className="flex gap-6 items-center">
                                <a 
                                    href="https://www.facebook.com/profile.php?id=61562025393976" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-brand-gold shadow-sm hover:bg-brand-gold hover:text-white transition-all group"
                                >
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">Follow Us</p>
                                    <p className="font-medium text-brand-bronze">Facebook Page</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-brand-gold/5 rounded-[40px] -z-10" />
                    <form id="st-child-home-contact-form" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest pl-4 text-brand-bronze">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-white border border-brand-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-gold transition-colors text-brand-bronze"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest pl-4 text-brand-bronze">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full bg-white border border-brand-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-gold transition-colors text-brand-bronze"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest pl-4 text-brand-bronze">Subject</label>
                            <select className="w-full bg-white border border-brand-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-gold transition-colors appearance-none text-brand-bronze">
                                <option>Private Tour Inquiry</option>
                                <option>Airport Transfer</option>
                                <option>Activity Booking</option>
                                <option>Other Request</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest pl-4 text-brand-bronze">Message</label>
                            <textarea
                                rows={5}
                                placeholder="Share your travel vision with us..."
                                className="w-full bg-white border border-brand-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-gold transition-colors resize-none mb-4 text-brand-bronze"
                            />
                        </div>

                        <button id="st-child-home-contact-submit" className="w-full bg-brand-gold text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-bronze transition-all shadow-lg group">
                            Send Message
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
