import { Routes, Route } from 'react-router-dom';
import { StartPage } from './components/StartPage';
import { LevelPage } from './components/LevelPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/:levelId" element={<LevelPage />} />
    </Routes>
  );
}

export default App;