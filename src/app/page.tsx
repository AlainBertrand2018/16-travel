"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Offers } from "@/components/Offers";
import { CarRental } from "@/components/CarRental";
import { BlogGrid } from "@/components/BlogGrid";
import { ContactForm } from "@/components/ContactForm";
import { GoldenTrace } from "@/components/GoldenTrace";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen">
      <Preloader />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <div className="ios-transition">
        <Hero />

        {/* Unified Journey Background Container */}
        <div className="relative">
          {/* Layer 2: The Golden Trace (Absolute Sibling) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <GoldenTrace />
          </div>

          {/* Layers 1 & 3: Sections (No root z-index for interleaving) */}
          <div className="relative">
            <Services />
            <Offers />
            <CarRental />

            {/* CTA Section - Manual Sandwich */}
            <section className="relative py-32 px-6 text-center text-brand-bronze overflow-hidden border-y border-brand-gold/10">
              <div className="absolute inset-0 bg-pastel-gold -z-20" />
              <div className="relative z-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-5xl md:text-7xl font-display mb-8">Ready for Departure?</h2>
                  <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-70">
                    Let us craft your perfect Mauritian escape. Our experts are waiting to serve you.
                  </p>
                  <button className="bg-brand-gold text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-brand-gold/90 transition-all shadow-xl hover:scale-105 active:scale-95">
                    Plan Your Trip Now
                  </button>
                </motion.div>
                {/* Decorative Shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10" />
              </div>
            </section>

            <BlogGrid />
            <ContactForm />
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
