"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowUpRight, Clock, User } from "lucide-react";

const posts = [
    {
        title: "The Unspoken Rules of Le Morne Hiking",
        excerpt: "Climbing Le Morne is more than just a hike; it's a pilgrimage to freedom.",
        date: "Feb 12, 2026",
        author: "Alain Bertrand",
        category: "Adventure",
        image: "/images/leMorne_hiking.avif"
    },
    {
        title: "Sunset Serenity: Best Coastal Spots",
        excerpt: "Where the sky meets the ocean in a blaze of Mauritian glory.",
        date: "Feb 10, 2026",
        author: "Marie Claire",
        category: "Luxe",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073"
    },
    {
        title: "Creole Gastronomy: A Masterclass",
        excerpt: "The secret spices that define the soul of our island's cuisine.",
        date: "Feb 08, 2026",
        author: "Chef Julien",
        category: "Food",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070"
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/leMorne_hiking.avif')" }}
                >
                    <div className="absolute inset-0 bg-brand-bronze/40" />
                </div>
                <div className="relative z-10 px-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="uppercase tracking-[0.3em] text-[10px] md:text-xs mb-8 font-bold text-white bg-brand-gold px-6 py-2 rounded-full shadow-lg inline-block"
                    >
                        Bespoke Island Narratives
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-9xl font-display mb-8 text-white drop-shadow-2xl italic whitespace-nowrap"
                    >
                        The Journal
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-light italic max-w-2xl mx-auto text-white/90 drop-shadow-md">
                        A collection of narratives, guides, and island secrets.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 md:px-24">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        <div className="md:col-span-2 relative group cursor-pointer overflow-hidden rounded-[80px]">
                            <div className="aspect-[21/9] w-full">
                                <img src={posts[0].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                <div className="absolute inset-x-12 bottom-12 text-white">
                                    <span className="bg-brand-gold px-4 py-1 rounded-full text-[10px] uppercase font-bold mb-6 inline-block">Featured</span>
                                    <h2 className="text-4xl md:text-7xl font-display mb-6 group-hover:text-brand-lagoon transition-colors">{posts[0].title}</h2>
                                    <div className="flex items-center gap-8 text-white/60 font-bold uppercase text-[10px] tracking-[0.2em]">
                                        <div className="flex items-center gap-2"><User className="w-4 h-4" /> {posts[0].author}</div>
                                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {posts[0].date}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {posts.slice(1).map((post, i) => (
                            <motion.article
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[16/10] rounded-[60px] overflow-hidden mb-12 shadow-2xl">
                                    <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-gold uppercase font-bold tracking-widest text-xs">{post.category}</span>
                                        <span className="text-muted-foreground text-xs font-medium">{post.date}</span>
                                    </div>
                                    <h3 className="text-4xl font-display group-hover:text-brand-lagoon transition-colors">{post.title}</h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-brand-gold">
                                        Read Story
                                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
