import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSurah, getVerses } from '../api/quranAPI';
import "./../global.css"

// Komponen untuk membersihkan teks terjemahan
const CleanTranslation = ({ html }) => {
  const cleanText = html.replace(/<sup[^>]*>.*?<\/sup>/g, '');
  return <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: cleanText }} />;
};

export default function SurahDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surah, setSurah] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [surahData, versesData] = await Promise.all([
          getSurah(id),
          getVerses(id, { 
            translations: 33,
            text_type: 'uthmani'
          })
        ]);
        
        setSurah(surahData);
        setVerses(versesData.verses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-8">Memuat surah...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-green-600 hover:text-green-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-green-800">{surah.name_complex}</h1>
            <p className="text-gray-600">{surah.translated_name.name} • {surah.verses_count} ayat</p>
          </div>

          <div className="space-y-6">
            {verses.map((verse) => (
              <div key={verse.id} className="verse-item border-b border-green-100 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center">
                    {verse.verse_number}
                  </span>
                </div>
                
                {/* Teks Arab */}
                <div className="arabic-text mb-4">
                  <p className="text-right text-3xl font-arabic leading-loose text-black">
                    {verse.text_uthmani}
                  </p>
                </div>
                
                {/* Teks Latin (Transliterasi) */}
                {verse.transliteration && (
                  <div className="transliteration mb-2">
                    <p className="text-gray-600 italic text-center">
                      {verse.transliteration.text}
                    </p>
                  </div>
                )}
                
                {/* Terjemahan dengan CleanTranslation */}
                <div className="translation">
                  <CleanTranslation html={verse.translations[0].text} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}