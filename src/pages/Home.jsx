import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSurahs } from '../api/quranAPI';
import LoadingSpinner from '../components/LoadingSpinner';
import "./../global.css";

export default function Home() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const data = await getSurahs();
        setSurahs(data);
      } catch (error) {
        console.error('Error fetching surah:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter(surah =>
    surah.name_simple.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">
            Al-Qur'an Digital
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            Baca dan pelajari Al-Qur'an dengan mudah. Temukan kedamaian dalam setiap ayat suci.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 ">
          <input
            type="text"
            placeholder="Cari surah..."
            className="w-full px-6 py-3 rounded-full border border-emerald-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Actions jika di implementasi*/}
        {/*   */}

        {/* Surah List */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurahs.map((surah) => (
              <div
                key={surah.id}
                onClick={() => navigate(`/surah/${surah.id}`)}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer transform hover:-translate-y-1 duration-200"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-lg mr-4">
                    <span className="font-semibold">{surah.id}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-700">
                      {surah.name_simple}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {surah.translated_name.name} • {surah.verses_count} Ayat
                    </p>
                  </div>
                  <div className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Al-Qur'an Digital • Dibangun dengan ❤️ untuk kemudahan umat
          </p>
        </div>
      </footer>
    </div>
  );
}