import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { Map, Skull } from 'lucide-react';
import { database } from '../config/firebase';
import { SuccessPage } from './SuccessPage';

export const LevelPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextLink, setNextLink] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);
  const { levelId } = useParams();

  useEffect(() => {
    const storedLevel = localStorage.getItem('currentLevel') || '1';
    setCurrentLevel(parseInt(storedLevel));
  }, [levelId]);

  useEffect(() => {
    const fetchHint = async () => {
      const levelRef = ref(database, `levels/${currentLevel}/hint`);
      const snapshot = await get(levelRef);
      setHint(snapshot.val());
    };
    fetchHint();
  }, [currentLevel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const levelRef = ref(database, `levels/${currentLevel}`);
      const snapshot = await get(levelRef);
      const levelData = snapshot.val();

      if (password.toLowerCase() === levelData.password.toLowerCase()) {
        setNextLink(levelData.next_link);
        setSuccess(true);
        localStorage.setItem('currentLevel', (currentLevel + 1).toString());
      } else {
        setError('The path remains sealed. Try again.');
      }
    } catch (error) {
      setError('The ancient magic prevents access. Please try again.');
    }
    setLoading(false);
  };

  if (success) {
    return <SuccessPage nextLink={nextLink} level={currentLevel} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-r from-red-900 via-gray-900 to-black flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/60 backdrop-blur-lg rounded-lg shadow-2xl p-8 max-w-md w-full border-2 border-red-500/30"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              textShadow: ['0 0 20px #ef4444', '0 0 10px #ef4444']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h1 className="text-4xl font-bold text-red-500 mb-2">Level {currentLevel}</h1>
          </motion.div>
          <div className="text-sm text-gray-400 animate-pulse flex items-center justify-center gap-2">
            <Map size={16} />
            Unravel the mystery...
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <motion.input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Speak the ancient words..."
              className="w-full px-4 py-3 rounded-lg bg-black/40 border-2 border-red-500/30 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              whileFocus={{ scale: 1.02 }}
              autoFocus
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
              loading 
                ? 'bg-gray-600' 
                : 'bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500'
            }`}
          >
            {loading ? 'Channeling ancient powers...' : 'Submit'}
          </motion.button>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center text-sm mt-2 flex items-center justify-center gap-2"
            >
              <Skull size={16} />
              {error}
            </motion.div>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-300"
            >
              {showHint ? 'Conceal the Hint' : 'Seek Guidance'}
            </button>
            {showHint && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-gray-400 p-4 bg-black/40 rounded-lg border border-red-500/20"
              >
                {hint}
              </motion.div>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};