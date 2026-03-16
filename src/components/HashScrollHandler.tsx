"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * HashScrollHandler
 * Detects URL hash changes and initial hashes to perform smooth scrolling
 * after ensuring the page content has potentially rendered.
 */
export function HashScrollHandler() {
    const pathname = usePathname();

    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash;
            if (!hash) return;

            const id = hash.substring(1);
            
            // Function to perform the actual scroll
            const performScroll = () => {
                const element = document.getElementById(id);
                if (element) {
                    // Small delay to ensure any layout shifts from animations are settled
                    setTimeout(() => {
                        element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }, 100);
                }
            };

            // If Preloader is present, wait for it to be removed
            const preloader = document.getElementById("st-section-global-preloader");
            if (preloader) {
                const observer = new MutationObserver((mutations, obs) => {
                    if (!document.getElementById("st-section-global-preloader")) {
                        performScroll();
                        obs.disconnect();
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
                
                // Fallback in case observer fails or takes too long
                setTimeout(() => {
                    performScroll();
                    observer.disconnect();
                }, 3000);
            } else {
                // Preloader already gone or not present
                performScroll();
            }
        };

        // Handle initial load and path changes
        scrollToHash();

        window.addEventListener("hashchange", scrollToHash);
        return () => window.removeEventListener("hashchange", scrollToHash);
    }, [pathname]);

    return null;
}
