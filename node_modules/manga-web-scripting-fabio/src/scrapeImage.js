import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeImages = async (anime, chapter) => {
  const searchUrl = `https://mangaonline.biz/search/${anime}`;
  const chapterUrl = `https://mangaonline.biz/capitulo/${anime}-capitulo-${chapter}/`;

  try {
    const { data: searchData } = await axios.get(searchUrl);
    const $search = cheerio.load(searchData);

    if ($search('.no-result').length > 0) {
      throw new Error('Anime not found');
    }

    const { data: chapterData } = await axios.get(chapterUrl);
    const $chapter = cheerio.load(chapterData);

    const images = [];
    $chapter('.content p img').each((index, img) => {
      const src = $chapter(img).attr('src');
      if (src) {
        images.push(src);
      }
    });

    return images;
  } catch (error) {
    throw new Error('Error while scraping images: ' + error.message);
  }
};

