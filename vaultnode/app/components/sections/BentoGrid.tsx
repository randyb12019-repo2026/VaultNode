"use client";

import { Network, Lock, Terminal } from "lucide-react";
import { FadeIn } from "../ui/FadeIn";

const cards = [
  {
    icon: Network,
    title: "Sync P2P Cifrada",
    description: "Sincroniza nodos locales vía Tailscale sin tocar servidores públicos.",
    wide: true,
  },
  {
    icon: Lock,
    title: "Cifrado AES-256",
    description: "Tus notas son un bloque de hielo indescifrable en reposo.",
    wide: false,
  },
  {
    icon: Terminal,
    title: "Arquitectura Ligera",
    description: "Optimizado para correr en Docker, Raspberry Pi o máquinas virtuales aisladas.",
    wide: false,
  },
];

export function BentoGrid() {
  return (
    <FadeIn>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`
                  group relative bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 md:p-8
                  hover:border-red-500/30 hover:shadow-[0_0_15px_rgba(220,38,38,0.1)]
                  transition-all duration-500
                  ${card.wide ? 'md:col-span-2' : ''}
                `}
              >
                <card.icon className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-neutral-50 mb-2">{card.title}</h3>
                <p className="text-neutral-400">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}