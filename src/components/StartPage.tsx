import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Moon, Sword, Compass } from 'lucide-react';
import { generateLevelUrl } from '../utils/levelUtils';
import { FloatingElements } from './FloatingElements';

export const StartPage = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    const firstLevel = generateLevelUrl(1);
    navigate(`/${firstLevel}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900 via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden"
    >
      <FloatingElements />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16"
        >
          <Moon size={100} className="text-red-500 animate-pulse" />
        </motion.div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/60 backdrop-blur-lg rounded-lg shadow-2xl p-8 border-2 border-red-500/30"
        >
          <div className="text-center space-y-6">
            <motion.h1 
              className="text-6xl font-bold text-red-500"
              animate={{ textShadow: ['0 0 20px #ef4444', '0 0 10px #ef4444'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              BLOODMOON
            </motion.h1>
            <h2 className="text-2xl font-semibold text-gray-200">
              Treasure Hunt
            </h2>
            
            <div className="space-y-4 py-6">
              <p className="text-gray-300">
                When the moon bleeds red, the hunt begins...
                Will you dare to uncover the mysteries that lie ahead?
              </p>
              <p className="text-sm text-gray-400">
                Join the fellowship:
                <a 
                  href="https://t.me/bloodmoon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 ml-2 inline-flex items-center"
                >
                  @bloodmoon <Sword size={16} className="ml-1" />
                </a>
              </p>
            </div>

            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-red-800 to-red-600 text-white font-bold transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 relative overflow-hidden group"
            >
              <span className="relative z-10 inline-flex items-center justify-center">
                Begin the Hunt
                <Compass size={20} className="ml-2 group-hover:rotate-90 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.button>

            <p className="text-xs text-gray-500 mt-4">
              "In blood we seek, in shadows we find..."
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};