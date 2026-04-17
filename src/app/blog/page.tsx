"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowUpRight, Clock, User } from "lucide-react";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import Image from "next/image";

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
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile === null) return null;

    if (isMobile) {
        const mobileSections = [
            {
                id: "header",
                title: "Journal",
                component: (
                    <div className="proportional-section relative overflow-hidden text-center bg-brand-bronze text-white p-12 min-h-screen flex flex-col justify-center">
                        <div className="absolute inset-0 opacity-40">
                             <Image 
                                src="/images/leMorne_hiking.avif" 
                                alt="Le Morne Hiking"
                                fill 
                                className="object-cover"
                                priority
                             />
                        </div>
                        <div className="relative z-10 space-y-8">
                             <span className="inline-block px-4 py-1.5 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
                                Bespoke Island Narratives
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display leading-[1.1]">
                                The <br /> Journal
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                A collection of narratives, guides, and island secrets.
                            </p>
                        </div>
                    </div>
                )
            },
            ...posts.map((post, i) => ({
                id: `post-${i}`,
                title: post.title,
                component: (
                    <div className="proportional-section bg-white p-10 min-h-screen flex flex-col justify-center space-y-8">
                        <div className="relative aspect-video w-full rounded-[40px] overflow-hidden shadow-2xl">
                            <Image 
                                src={post.image} 
                                alt={post.title}
                                fill 
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute top-4 right-4 bg-brand-gold px-3 py-1 rounded-full text-[8px] uppercase font-bold text-white">
                                {post.category}
                            </div>
                        </div>
                        <div className="space-y-6 text-left">
                            <h3 className="text-2xl font-display text-brand-bronze">{post.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">{post.excerpt}</p>
                            <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-widest text-brand-gold">
                                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author}</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.date}</span>
                            </div>
                            <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/20 pb-1">
                                Read Story <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )
            }))
        ];

        return <MobileLayout sections={mobileSections} />;
    }

    return (
        <main className="min-h-screen">
            <Navbar />
            <section id="st-section-blog-header" className="relative h-[70vh] flex items-center justify-center overflow-hidden text-center">
                <div
                    className="absolute inset-0"
                >
                    <Image 
                        src="/images/leMorne_hiking.avif"
                        alt="Blog Header"
                        fill
                        className="object-cover"
                        priority
                    />
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
                        className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-display mb-8 text-white drop-shadow-2xl"
                    >
                        The Journal
                    </motion.h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto text-white/90 drop-shadow-md">
                        A collection of narratives, guides, and island secrets.
                    </p>
                </div>
            </section>

            <section id="st-section-blog-content" className="py-24 px-6 md:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        <div id="st-child-blog-content-featured" className="md:col-span-2 relative group cursor-pointer overflow-hidden rounded-[80px]">
                            <div className="aspect-[21/9] w-full relative">
                                <Image 
                                    src={posts[0].image} 
                                    alt={posts[0].title}
                                    fill 
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    sizes="100vw"
                                />
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

                        <div id="st-child-blog-content-grid" className="contents">
                            {posts.slice(1).map((post, i) => (
                                <motion.article
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[16/10] rounded-[60px] overflow-hidden mb-12 shadow-2xl">
                                        <Image 
                                            src={post.image} 
                                            alt={post.title}
                                            fill 
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
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
                </div>
            </section>
            <Footer />
        </main>
    );
}
