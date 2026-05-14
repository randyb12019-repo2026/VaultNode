"use client";

import { FadeIn } from "../ui/FadeIn";

const communityFeatures = [
  "Código abierto",
  "Auto-alojado",
  "Actualizaciones vía Git",
  "Community support",
];

const enterpriseFeatures = [
  "Soporte prioritario",
  "Auditoría de seguridad",
  "Despliegue offline asistido",
  "SLA 99.9%",
];

export function Pricing() {
  return (
    <FadeIn>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 text-center mb-12">
            Licencias
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-8">
              <div className="text-4xl font-bold text-neutral-50 mb-2">0$</div>
              <div className="text-neutral-400 mb-6">Community</div>
              <ul className="space-y-3 mb-8">
                {communityFeatures.map((feature, i) => (
                  <li key={i} className="text-neutral-300 text-sm">• {feature}</li>
                ))}
              </ul>
              <button className="w-full py-3 border border-neutral-700 text-neutral-300 rounded-lg
                               hover:border-neutral-500 transition-all duration-300 cursor-pointer">
                Clonar Repositorio
              </button>
            </div>
            
            <div className="relative bg-neutral-900/50 border border-red-500/40 rounded-xl p-8
                          hover:shadow-[0_0_25px_rgba(220,38,38,0.15)] hover:border-red-500/60
                          transition-all duration-500">
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Recomendado
              </div>
              <div className="text-4xl font-bold text-neutral-50 mb-2">49$/mes</div>
              <div className="text-neutral-400 mb-6">Enterprise Air-Gapped</div>
              <ul className="space-y-3 mb-8">
                {enterpriseFeatures.map((feature, i) => (
                  <li key={i} className="text-neutral-300 text-sm">• {feature}</li>
                ))}
              </ul>
              <button className="w-full py-3 bg-red-600 text-white rounded-lg
                               hover:bg-red-700 transition-all duration-300 cursor-pointer">
                Contactar Ventas
              </button>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}