import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const BlueprintBackground = () => {
  const { scrollYProgress } = useScroll();
  const depthY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div className="absolute inset-[-25%]" style={{ y: depthY }}>
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #7D6B5D 1px, transparent 1px), linear-gradient(to bottom, #7D6B5D 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          animate={{ x: [0, -40], y: [0, -40] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};
