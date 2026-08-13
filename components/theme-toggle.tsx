"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle({ iconSize = 18 }: { iconSize?: number }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const applyTheme = useCallback((newTheme: "dark" | "light") => {
    const html = document.documentElement;
    if (newTheme === "light") {
      html.classList.add("light");
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
      html.classList.remove("light");
    }
    localStorage.setItem("theme", newTheme);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme ?? "dark";
    if (initialTheme !== "dark") {
      setTimeout(() => {
        setTheme(initialTheme);
        applyTheme(initialTheme);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [applyTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // Get the exact center of the button using its DOM rect
    const btn = buttonRef.current;
    const rect = btn?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Fallback: no View Transitions API support, or the user opted out of motion
    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(newTheme);
      applyTheme(newTheme);
      return;
    }

    // Farthest corner distance, so the ripple fully clears the viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const html = document.documentElement;

    // Layering must be decided from the DIRECTION of the change, not from the
    // theme class (which is already swapped once the pseudo-elements exist).
    html.dataset.themeTransition = newTheme === "dark" ? "to-dark" : "to-light";

    // Trigger the view transition — React state + DOM class update happens inside
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
      applyTheme(newTheme);
    });

    const cleanup = () => {
      delete html.dataset.themeTransition;
    };

    transition.ready.then(() => {
      requestAnimationFrame(() => {
        const toDark = newTheme === "dark";

        // clip-path only changes WHAT IS VISIBLE — it never resizes the page
        // content, so there is no zoom. The circle grows out of the button on
        // the way into dark, and shrinks back into it on the way out.
        const circles = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        const anim = html.animate(
          { clipPath: toDark ? circles : [...circles].reverse() },
          {
            duration: 750,
            easing: "ease-in-out",
            // The ripple always clips the DARK frame: the incoming one when
            // going dark, the outgoing one when it gets vacuumed away.
            pseudoElement: toDark
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
          }
        );

        anim.finished.catch(() => {}).finally(cleanup);
      });
    });

    // Safety net: never leave the layering attribute behind if the transition
    // is skipped (e.g. another one starts before this finishes).
    transition.finished.catch(cleanup);
  };

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <AnimatePresence mode="wait">
        {mounted &&
          (theme === "dark" ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={iconSize} className="text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={iconSize} className="text-primary" />
            </motion.div>
          ))}
      </AnimatePresence>
    </motion.button>
  );
}
