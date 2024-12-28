import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { generateLevelUrl } from '../utils/levelUtils';

interface SuccessPageProps {
  nextLink: string;
  level: number;
}

export const SuccessPage = ({ nextLink, level }: SuccessPageProps) => {
  const navigate = useNavigate();
  
  const handleContinue = () => {
    const nextLevel = parseInt(level.toString()) + 1;
    const nextUrl = generateLevelUrl(nextLevel);
    navigate(`/${nextUrl}`);
    window.location.reload();
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-r from-red-900 via-gray-900 to-black flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
        className="bg-black/60 backdrop-blur-lg rounded-lg shadow-2xl p-8 max-w-md w-full text-center border-2 border-red-500/30"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-red-500 mb-4">Victory! 🩸</h1>
        </motion.div>
        <p className="text-xl text-gray-300 mb-6">You've conquered Level {level}</p>
        
        <div className="bg-black/40 p-4 rounded-lg mb-6 border border-red-500/20">
          <p className="text-sm text-gray-400 mb-2">Your path continues through:</p>
          <p className="text-lg font-mono break-all text-red-400">{nextLink}</p>
        </div>

        {level < 7 && (
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 transition-all duration-300 shadow-lg shadow-red-500/20"
          >
            Continue the Hunt
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};