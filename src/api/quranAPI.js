import axios from 'axios';

const BASE_URL = 'https://api.quran.com/api/v4';

export const getSurahs = async () => {
  const response = await axios.get(`${BASE_URL}/chapters`);
  return response.data.chapters;
};

export const getSurah = async (id) => {
  const response = await axios.get(`${BASE_URL}/chapters/${id}`);
  return response.data.chapter;
};

export const getVerses = async (surahId, params = {}) => {
    const response = await axios.get(`${BASE_URL}/verses/by_chapter/${surahId}`, {
      params: {
        language: 'id', // Terjemahan Indonesia
        text_type: 'uthmani',
        fields: 'text_uthmani,translations',
        ...params, // Menyebarkan params tambahan yang diberikan
      },
    });
    console.log(response.data); // Tambahkan ini untuk debug
    return response.data;
  };