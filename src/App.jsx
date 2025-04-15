import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SurahDetail from './pages/SurahDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surah/:id" element={<SurahDetail />} />
      </Routes>
    </BrowserRouter>
  );
}