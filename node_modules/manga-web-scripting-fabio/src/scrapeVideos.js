import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeVideos = async (anime, ep) => {
  const videoUrl = `https://animesonlinecc.to/episodio/${anime}-episodio-${ep}/`;

  try {
    // Solicita a página do episódio
    const { data } = await axios.get(videoUrl);
    
    // Carrega o HTML com Cheerio
    const $ = cheerio.load(data);
    
    // Encontra o src do iframe
    const iframeSrc = $('iframe').attr('src');

    if (iframeSrc) {
      return iframeSrc;
    } else {
      throw new Error('Video URL not found');
    }
  } catch (error) {
    throw new Error('Error while scraping video: ' + error.message);
  }
};
