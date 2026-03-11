"use client";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
}

export function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-brand-bronze/40 backdrop-blur-sm z-[100]"
                    />
                    
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] bg-white rounded-[40px] shadow-2xl z-[101] overflow-hidden flex flex-col"
                    >
                        <div className="p-8 border-b border-brand-gold/10 flex justify-between items-center">
                            <h2 className="text-3xl font-display text-brand-bronze">{title}</h2>
                            <button 
                                onClick={onClose}
                                className="w-10 h-10 rounded-full border border-brand-gold/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {content}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export const LegalContent = {
    privacy: (
        <div className="space-y-6">
            <p>At Sixteen Travel, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.</p>
            
            <section className="space-y-2">
                <h3 className="text-brand-bronze font-bold uppercase text-xs tracking-widest">1. Information Collection</h3>
                <p>We collect information you provide directly to us when you make a booking, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, and flight details.</p>
            </section>
            
            <section className="space-y-2">
                <h3 className="text-brand-bronze font-bold uppercase text-xs tracking-widest">2. Use of Information</h3>
                <p>We use your information to process bookings, provide customer support, and send you travel updates or promotional offers. We do not sell or share your data with third parties for their marketing purposes.</p>
            </section>
            
            <section className="space-y-2">
                <h3 className="text-brand-bronze font-bold uppercase text-xs tracking-widest">3. Data Protection</h3>
                <p>We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and access is limited to authorized personnel only.</p>
            </section>
            
            <section className="space-y-2">
                <h3 className="text-brand-bronze font-bold uppercase text-xs tracking-widest">4. Cookies</h3>
                <p>Our website uses cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings.</p>
            </section>
            
            <p className="mt-8 text-sm italic">If you have any questions about our Privacy Policy, please contact us at contact@sixteentravel.com.</p>
        </div>
    ),
    terms: (
        <div className="space-y-6">
            <p>By using the services of Sixteen Travel, you agree to the following terms and conditions.</p>
            
            <section className="space-y-2">
                <h3 className="text-brand-bronze font-bold uppercase text-xs tracking-widest">1. Bookings & Availability</h3>
                <p>All services are subject to availability. We recommend booking at least 24 hours in advance to ensure our premium standards of service.</p>
            </section>
            
            <section className="space-y-2">
                <h3 className="text-brand-bronze font-bold uppercase text-xs tracking-widest">2. Payment Policy</h3>
                <p>Unless otherwise agreed, payment is to be made via cash settlement on arrival or prior bank transfer. We do not require advance payments for standard bookings.</p>
            </section>
            
            <section className="space-y-2">
                <h3 className="text-brand-bronze font-bold uppercase text-xs tracking-widest">3. Cancellation Policy</h3>
                <p>Cancellations should be made at least 24 hours before the scheduled service. Last-minute cancellations may be subject to a fee.</p>
            </section>
            
            <section className="space-y-2">
                <h3 className="text-brand-bronze font-bold uppercase text-xs tracking-widest">4. Liability</h3>
                <p>Sixteen Travel acts as a service provider and is not liable for loss or damage to personal belongings during transfers or tours. Passengers are responsible for their own travel insurance.</p>
            </section>
            
            <section className="space-y-2">
                <h3 className="text-brand-bronze font-bold uppercase text-xs tracking-widest">5. Governance</h3>
                <p>These terms are governed by the laws of the Republic of Mauritius.</p>
            </section>
        </div>
    )
};
