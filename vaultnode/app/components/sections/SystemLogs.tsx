"use client";

import { motion } from "framer-motion";

const logs = [
  'user: sec_ops_01 | msg: "La única herramienta de documentación aprobada para nuestro clúster aislado."',
  'user: homelabber_99 | msg: "La velocidad de renderizado de grafos en local destruye a cualquier alternativa web."',
  'user: dev_null | msg: "Finalmente una solución sin telemetría oculta ni dependencias de terceros."',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

export function SystemLogs() {
  return (
    <section className="py-24 md:py-32 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="font-mono text-green-500/60 text-sm leading-loose space-y-2"
        >
          {logs.map((log, i) => (
            <motion.div key={i} variants={itemVariants}>
              [SYS_LOG] {log}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}