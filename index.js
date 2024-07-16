const express = require('express');
const GetMangaService = require('./src/MangaDex/getMangaService');
const { swaggerUi, specs } = require('./src/Swagger/swagger');
const mangaService = new GetMangaService();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /mangas:
 *   get:
 *     summary: Retorna uma lista de mangas
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número da página
 *     responses:
 *       200:
 *         description: Lista de mangas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       attributes:
 *                         type: object
 */
app.get('/mangas', async (req, res) => {
  try {
    const { page = 0 } = req.query;
    const mangas = await mangaService.getAllMangas(Number(page));
    res.json(mangas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /cover/{id}:
 *   get:
 *     summary: Retorna informações sobre uma capa de manga
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da capa
 *     responses:
 *       200:
 *         description: Informações da capa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     attributes:
 *                       type: object
 */
app.get('/cover/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cover = await mangaService.getCoverFileName(id);
    res.json(cover);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /manga/title/{title}:
 *   get:
 *     summary: Retorna mangas pelo título
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Título do manga
 *     responses:
 *       200:
 *         description: Mangas correspondentes ao título
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       attributes:
 *                         type: object
 */
app.get('/manga/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const manga = await mangaService.getMangaByTitle(title);
    res.json(manga);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /manga/cover/{id}/{filename}:
 *   get:
 *     summary: Retorna a URL da capa do manga
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da capa
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do arquivo da capa
 *     responses:
 *       200:
 *         description: URL da capa do manga
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
app.get('/manga/cover/:id/:filename', (req, res) => {
  const { id, filename } = req.params;
  const url = mangaService.getMangaCover(id, filename);
  res.json({ url });
});

/**
 * @swagger
 * /manga/{id}/chapters:
 *   get:
 *     summary: Retorna uma lista de capítulos de um manga
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do manga
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número da página
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: asc
 *         description: Ordem dos capítulos
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Idioma dos capítulos
 *     responses:
 *       200:
 *         description: Lista de capítulos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       attributes:
 *                         type: object
 */
app.get('/manga/:id/chapters', async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 0, order = 'asc', language } = req.query;
    const chapters = await mangaService.getMangaChapterList(id, Number(page), order, language);
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /manga/{id}/volume/{volume}:
 *   get:
 *     summary: Retorna capítulos de um manga por volume
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do manga
 *       - in: path
 *         name: volume
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número do volume
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Idioma dos capítulos
 *     responses:
 *       200:
 *         description: Lista de capítulos por volume
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       attributes:
 *                         type: object
 */
app.get('/manga/:id/volume/:volume', async (req, res) => {
  try {
    const { id, volume } = req.params;
    const { language } = req.query;
    const chapters = await mangaService.getMangaByVolume(id, Number(volume), language);
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /manga/{id}/aggregate:
 *   get:
 *     summary: Retorna uma lista agregada de capítulos de um manga
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do manga
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Idioma dos capítulos
 *     responses:
 *       200:
 *         description: Lista agregada de capítulos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.get('/manga/:id/aggregate', async (req, res) => {
  try {
    const { id } = req.params;
    const { language } = req.query;
    const aggregate = await mangaService.getAllChapter(id, language);
    res.json(aggregate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /chapter/{id}:
 *   get:
 *     summary: Retorna dados de uma imagem de capítulo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do capítulo
 *     responses:
 *       200:
 *         description: Dados da imagem do capítulo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 */
app.get('/chapter/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const chapterImageData = await mangaService.getChapterImageData(id);
    res.json(chapterImageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /chapter/image/{hash}/{filename}:
 *   get:
 *     summary: Retorna a URL de uma imagem de capítulo
 *     parameters:
 *       - in: path
 *         name: hash
 *         required: true
 *         schema:
 *           type: string
 *         description: Hash da imagem
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do arquivo da imagem
 *     responses:
 *       200:
 *         description: URL da imagem do capítulo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
app.get('/chapter/image/:hash/:filename', (req, res) => {
  const { hash, filename } = req.params;
  const url = mangaService.getChapterImage(hash, filename);
  res.json({ url });
});

/**
 * @swagger
 * /manga/cover-id:
 *   post:
 *     summary: Retorna o ID da capa de um manga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mangaItem:
 *                 type: object
 *                 properties:
 *                   relationships:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                         id:
 *                           type: string
 *     responses:
 *       200:
 *         description: ID da capa do manga
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 coverID:
 *                   type: string
 */
app.post('/manga/cover-id', (req, res) => {
  const { mangaItem } = req.body;
  const coverID = mangaService.getCoverId(mangaItem);
  res.json({ coverID });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
