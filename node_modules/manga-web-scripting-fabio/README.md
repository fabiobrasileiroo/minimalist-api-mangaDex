# Manga Web Scripting

A package to scrape images of manga chapters from [mangaonline.biz](https://mangaonline.biz).

## Link lib npm
[npmjs/manga-web-scripting-fabio](https://www.npmjs.com/package/manga-web-scripting-fabio)

## Installation

To install the package, run:

```bash
npm i manga-web-scripting-fabio
```

### Usage with ES Modules
Example configuration using "type": "module":
```js
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "manga-web-scripting-fabio": "^1.2.0"
  }
}
```

### How to Use?
``` js
import { scrapeImages } from 'manga-web-scripting-fabio';

(async () => {
  try {
    const anime = 'naruto';
    const chapter = 1;
    const images = await scrapeImages(anime, chapter);
    console.log('Scraped images:', images);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
```

# Video Scraping Functionality

This documentation describes the video scraping functionality implemented in the project. The `scrapeVideos` function is responsible for extracting the video link from an anime episode page.

## Description

The `scrapeVideos` function makes an HTTP request to the episode page of an anime and extracts the video link embedded in the `iframe` on the page.

## Function

### `scrapeVideos(anime: string, ep: number)`

**Parameters:**

- `anime` (string): The name of the anime to be scraped.
- `ep` (number): The episode number from which the video should be extracted.

**Returns:**

- `Promise<string>`: Returns a promise that resolves with the video URL if found. Otherwise, it throws an error.

**Usage Example:**

```javascript
import { scrapeVideos } from 'manga-web-scripting-fabio';

(async () => {
  try {
    const anime = 'naruto-shippuden';
    const ep = 1; // Episode number

    const videoUrl = await scrapeVideos(anime, ep);
    console.log("Video URL: ", videoUrl);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
