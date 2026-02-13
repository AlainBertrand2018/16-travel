"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const posts = [
    {
        id: 1,
        title: "The Unspoken Rules of Le Morne Hiking",
        excerpt: "Discover the spiritual and physical challenge of climbing the island's most iconic peak.",
        date: "Feb 12, 2026",
        category: "Adventure",
        image: "/images/leMorne_hiking.avif"
    },
    {
        id: 2,
        title: "A Culinary Journey through Port Louis",
        excerpt: "From Dholl Puri to refined Creole fusion, explore the authentic flavors of Mauritius.",
        date: "Feb 10, 2026",
        category: "Culture",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070"
    },
    {
        id: 3,
        title: "Sustainable Luxury: The Future of Tourism",
        excerpt: "How Sixteen Travel is leading the way in eco-conscious premium experiences.",
        date: "Feb 08, 2026",
        category: "Sustainability",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073"
    }
];

export function BlogGrid() {
    return (
        <section className="relative py-24 px-6 md:px-24" id="blog">
            {/* Layer 1: Background Plate */}
            <div className="absolute inset-0 bg-pastel-cream -z-20" />

            <div className="relative z-20 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display mb-4 italic text-brand-bronze">The Journal</h2>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Insights, stories, and curated travel guides from our destination experts.
                        </p>
                    </div>
                    <Link href="/blog" className="text-sm font-bold uppercase tracking-widest border-b-2 border-brand-gold/20 hover:border-brand-gold pb-1 text-brand-gold transition-all">
                        Read All Stories
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-brand-bronze/80 text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold shadow-lg backdrop-blur-sm">
                                    {post.category}
                                </div>
                            </div>
                            <p className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-3">{post.date}</p>
                            <h3 className="text-2xl font-display mb-4 text-brand-bronze group-hover:text-brand-gold transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed line-clamp-2 text-sm mb-6">
                                {post.excerpt}
                            </p>
                            <div className="mt-auto flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-brand-gold group">
                                Read Story
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
