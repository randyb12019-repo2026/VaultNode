"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #404040 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-50 mb-6"
        >
          Tu cerebro digital.<br />
          <span className="text-red-500">100% Air-Gapped.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          La alternativa a Notion para entornos hiper-seguros. Sin nube, sin telemetría, solo tú y tus datos.
        </motion.p>

        <motion.div variants={itemVariants}>
          <button
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-medium 
                       hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-105 
                       transition-all duration-300 cursor-pointer"
          >
            Descargar Binario v2.4
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}