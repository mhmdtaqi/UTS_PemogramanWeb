import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSurahs } from '../api/quranAPI';

export default function SurahList() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const data = await getSurahs();
        setSurahs(data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  if (loading) return <div className="text-center py-4">Memuat daftar surah...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs.map((surah) => (
        <div
          key={surah.id}
          onClick={() => navigate(`/surah/${surah.id}`)}
          className="p-4 border border-green-200 rounded-lg hover:bg-green-50 cursor-pointer transition"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full mr-3">
              {surah.id}
            </div>
            <div>
              <h3 className="font-medium text-green-800">{surah.name_simple}</h3>
              <p className="text-sm text-gray-600">{surah.translated_name.name} • {surah.verses_count} ayat</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}