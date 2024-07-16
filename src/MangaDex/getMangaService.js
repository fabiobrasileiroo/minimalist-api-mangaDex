import axios from 'axios';

const BASE_URL = 'https://api.mangadex.org';
const BASE_IMAGE_URL = 'https://uploads.mangadex.org';

export default class GetMangaService {
  constructor() {
    this.languages = ['en'];
  }

  async getAllMangas(page) {
    const options = {
      params: {
        'limit': 96,
        'offset': page,
        'order[latestUploadedChapter]': 'desc',
        'hasAvailableChapters': "true",
        "contentRating[]": ["suggestive", "safe"]
      }
    };
    const response = await axios.get(`${BASE_URL}/manga`, options);
    return response.data;
  }

  async getCoverFileName(id_cover_art) {
    const response = await axios.get(`${BASE_URL}/cover/${id_cover_art}`);
    return response.data;
  }

  async getMangaByTitle(title) {
    const options = { params: { 'title': title } };
    const response = await axios.get(`${BASE_URL}/manga/`, options);
    return response.data;
  }

  getMangaCover(id_cover_art, file_name) {
    return `${BASE_IMAGE_URL}/covers/${id_cover_art}/${file_name}.256.jpg`;
  }

  async getMangaChapterList(id_manga, page, order, language) {
    const params = {
      'order[chapter]': order,
      'includeEmptyPages': 0,
      'limit': 96,
      'offset': page
    };
    if (language) {
      params['translatedLanguage[]'] = language;
    }
    const options = { params };
    const response = await axios.get(`${BASE_URL}/chapter?manga=${id_manga}`, options);
    return response.data;
  }

  async getMangaByVolume(id_manga, volume, language) {
    const params = {
      'order[chapter]': 'asc',
      'includeEmptyPages': 0,
      'limit': 100,
      'volume[]': volume
    };
    if (language) {
      params['translatedLanguage[]'] = language;
    }
    const options = { params };
    const response = await axios.get(`${BASE_URL}/chapter?manga=${id_manga}`, options);
    return response.data;
  }

  async getAllChapter(id_manga, language) {
    const options = {
      params: {
        'translatedLanguage[]': language
      }
    };
    const response = await axios.get(`${BASE_URL}/manga/${id_manga}/aggregate`, options);
    return response.data;
  }

  async getChapterImageData(id_chapter) {
    const response = await axios.get(`${BASE_URL}/at-home/server/${id_chapter}`);
    return response.data;
  }

  getChapterImage(hash, image_chapter_data) {
    return `${BASE_IMAGE_URL}/data/${hash}/${image_chapter_data}`;
  }

  getCoverId(mangaItem) {
    const coverID = mangaItem.relationships.find(({ type }) => type === 'cover_art').id;
    return coverID;
  }
}

