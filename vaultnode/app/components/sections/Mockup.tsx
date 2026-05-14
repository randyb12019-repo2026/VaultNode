"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";
import { FadeIn } from "../ui/FadeIn";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const TARGET = "# Protocolos de Seguridad Alpha";
const DURATION = 1000;
const INTERVAL = 50;
const INITIAL_CIPHER = "x9#mK2$pL8vN5qR7jH4tY6uW3cA0bD9eF1gS8kZ"; // fixed string for hydration

function generateScramble(len: number): string {
  return Array.from({ length: len }, () =>
    CHARS[Math.floor(Math.random() * CHARS.length)]
  ).join("");
}

function ScrambleText() {
  const [displayText, setDisplayText] = useState(INITIAL_CIPHER);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(INITIAL_CIPHER);
      setProgress(0);
      return;
    }

    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += INTERVAL;
      const revealIndex = Math.floor((elapsed / DURATION) * TARGET.length);

      setDisplayText(
        TARGET.split("")
          .map((char, i) =>
            i < revealIndex ? char : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      setProgress(Math.min((elapsed / DURATION) * 100, 100));

      if (elapsed >= DURATION) {
        clearInterval(interval);
        setDisplayText(TARGET);
        setProgress(100);
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [isHovering]);

  if (prefersReducedMotion) {
    return (
      <div className="w-full bg-neutral-950 p-6">
        <h2 className="font-mono text-neutral-50 text-xl md:text-2xl">{TARGET}</h2>
      </div>
    );
  }

  return (
    <div 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)}
      className="w-full"
    >
      <div className="h-[2px] w-full bg-neutral-800">
        <motion.div
          className="h-full bg-red-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>
      <div className="font-mono text-neutral-50 text-xl md:text-2xl p-6 min-h-[120px]">
        {displayText}
      </div>
    </div>
  );
}

export function Mockup() {
  return (
    <FadeIn>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-800/80 rounded-t-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="flex-1 text-center text-xs text-neutral-500 font-mono">
                vault-node-editor
              </span>
            </div>
            
            <div className="flex bg-neutral-900/50">
              <div className="hidden md:block w-1/4 border-r border-neutral-800 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-neutral-400 text-sm font-mono">
                    <Folder className="w-4 h-4" />
                    <span>vault/</span>
                  </div>
                  <div className="pl-6 space-y-2">
                    <div className="flex items-center gap-2 text-neutral-500 text-sm font-mono">
                      <Folder className="w-3 h-3" />
                      <span>notes/</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 text-sm font-mono">
                      <Folder className="w-3 h-3" />
                      <span>crypto/</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 text-sm font-mono">
                      <Folder className="w-3 h-3" />
                      <span>logs/</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 bg-neutral-950">
                <ScrambleText />
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}