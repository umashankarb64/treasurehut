import { motion } from 'framer-motion';

export const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        animate={{
          y: ['0vh', '100vh'],
          x: [Math.random() * 100 + 'vw', Math.random() * 100 + 'vw'],
          opacity: [0, 0.2, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * 10
        }}
      >
        {i % 2 === 0 ? '🌕' : '✨'}
      </motion.div>
    ))}
  </div>
);