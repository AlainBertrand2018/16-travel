"use client";
import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mb-12 ${centered ? 'text-center' : ''}`}
        >
            <h2 className="text-4xl md:text-5xl font-display mb-4 text-brand-bronze">{title}</h2>
            {subtitle && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
            <div className={`h-1 w-20 bg-brand-gold mt-4 ${centered ? 'mx-auto' : ''}`} />
        </motion.div>
    );
}
