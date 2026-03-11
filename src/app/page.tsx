"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhatWeDo } from "@/components/WhatWeDo";
import { AboutSixteen } from "@/components/AboutSixteen";
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

        {/* Journey Container */}
        <div className="relative">
          {/* Layer: The Golden Trace Background */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <GoldenTrace />
          </div>

          {/* Stacking Sections (2 & 3) */}
          <div id="st-section-home-stacking-group" className="relative">
            <WhatWeDo />
            <AboutSixteen />
          </div>

          {/* Subsequent Sections (4+) - They push the stacking group up */}
          <div id="st-section-home-normal-flow" className="relative bg-white z-[40]">
            <Services />
            <Offers />
            <CarRental />

            <section id="st-section-home-cta" className="relative py-32 px-6 overflow-hidden">
              <div className="absolute inset-0 bg-brand-bronze -z-20" />
              <div className="absolute inset-0 bg-[url('https://sixteen-travel.vercel.app/images/hero-Background.jpg')] opacity-20 bg-cover bg-center -z-10" />

              <div className="relative z-20 max-w-4xl mx-auto text-center text-white">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 id="st-child-home-cta-heading" className="text-5xl md:text-7xl font-display mb-8">Ready for Departure?</h2>
                  <p className="text-xl md:text-2xl mb-12 text-white/80">
                    Our destination specialists are ready to curate your next extraordinary journey.
                  </p>
                  <button id="st-child-home-cta-button" className="bg-brand-gold hover:bg-white hover:text-brand-bronze text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl">
                    Plan Your Trip
                  </button>
                </motion.div>
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
