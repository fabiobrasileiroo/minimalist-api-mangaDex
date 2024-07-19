# MangaDex API mimalista

## End-point público para teste

[https:minimalist-api-manga-dex.vercel.app/](https://minimalist-api-manga-dex.vercel.app/)
<br>
[https://minimalist-api-manga-dex.vercel.app/mangas](https://minimalist-api-manga-dex.vercel.app/mangas)
<br>
[https://minimalist-api-manga-dex.vercel.app/manga/title/naruto](https://minimalist-api-manga-dex.vercel.app/manga/title/naruto)

https://minimalist-api-manga-dex.vercel.app/chapter/3baec59f-9d9d-4695-ab92-bec64f495a6a

Esta é uma API Node.js desenvolvida para interagir com a API MangaDex. Ela permite acessar várias informações sobre mangas, como lista de mangas, detalhes de capítulos, capas, e mais.

## Funcionalidades

- **Obter Lista de Mangas**: Retorna uma lista paginada de mangas.
- **Obter Detalhes de Capas**: Retorna informações sobre uma capa específica de manga.
- **Buscar Manga por Título**: Permite buscar mangas usando o título.
- **Obter URL da Capa**: Gera a URL da capa de um manga usando o ID e o nome do arquivo.
- **Listar Capítulos de um Manga**: Retorna uma lista de capítulos de um manga específico, com opções de ordenação e idioma.
- **Obter Capítulos por Volume**: Retorna capítulos de um manga específico por volume.
- **Obter Lista Agregada de Capítulos**: Retorna uma lista agregada de capítulos de um manga.
- **Obter Dados de Imagem de Capítulo**: Retorna dados de uma imagem de capítulo específico.
- **Obter URL da Imagem de Capítulo**: Gera a URL de uma imagem de capítulo usando o hash e o nome do arquivo.
- **Obter ID da Capa**: Retorna o ID da capa de um manga específico a partir dos relacionamentos do item.

## Documentação da API
![localhost_3000_api-docs_](https://github.com/user-attachments/assets/97e8a108-4496-4787-aabd-b8b0a21d1218)

A documentação completa da API está disponível em usando a rota http://localhost:3000/api-docs da api

[Swagger UI](http://localhost:3000/api-docs).

## Instalação

Para instalar as dependências e iniciar o servidor, siga os passos abaixo:

1. Clone o repositório:

```sh
git clone https://github.com/seu-usuario/mangadex-api.git
cd mangadex-api
```

2. Instale as dependências:

```
npm install

```
3. Inicie o servidor:

```
npm start
```


Rotas da API
GET /mangas

Retorna uma lista de mangas.

Parâmetros de Query:

    page (opcional): Número da página (default: 0).

Exemplo de Resposta:

json

{
  "data": [
    {
      "id": "manga-id",
      "attributes": {
        // atributos do manga
      }
    }
  ]
}

GET /cover/:id

Retorna informações sobre uma capa de manga.

Parâmetros de Rota:

    id: ID da capa.

Exemplo de Resposta:

json

{
  "data": {
    "id": "cover-id",
    "attributes": {
      // atributos da capa
    }
  }
}

GET /manga/title/:title

Busca mangas pelo título.

Parâmetros de Rota:

    title: Título do manga.

Exemplo de Resposta:

json

{
  "data": [
    {
      "id": "manga-id",
      "attributes": {
        // atributos do manga
      }
    }
  ]
}

GET /manga/cover/:id/:filename

Retorna a URL da capa do manga.

Parâmetros de Rota:

    id: ID da capa.
    filename: Nome do arquivo da capa.

Exemplo de Resposta:

json

{
  "url": "https://uploads.mangadex.org/covers/cover-id/filename.256.jpg"
}

GET /manga/:id/chapters

Retorna uma lista de capítulos de um manga.

Parâmetros de Rota:

    id: ID do manga.

Parâmetros de Query:

    page (opcional): Número da página (default: 0).
    order (opcional): Ordem dos capítulos (default: "asc").
    language (opcional): Idioma dos capítulos.

Exemplo de Resposta:

json

{
  "data": [
    {
      "id": "chapter-id",
      "attributes": {
        // atributos do capítulo
      }
    }
  ]
}

GET /manga/:id/volume/:volume

Retorna capítulos de um manga por volume.

Parâmetros de Rota:

    id: ID do manga.
    volume: Número do volume.

Parâmetros de Query:

    language (opcional): Idioma dos capítulos.

Exemplo de Resposta:

json

{
  "data": [
    {
      "id": "chapter-id",
      "attributes": {
        // atributos do capítulo
      }
    }
  ]
}

GET /manga/:id/aggregate

Retorna uma lista agregada de capítulos de um manga.

Parâmetros de Rota:

    id: ID do manga.

Parâmetros de Query:

    language (opcional): Idioma dos capítulos.

Exemplo de Resposta:

json

{
  "data": {
    // dados agregados do manga
  }
}

GET /chapter/:id

Retorna dados de uma imagem de capítulo.

Parâmetros de Rota:

    id: ID do capítulo.

Exemplo de Resposta:

json

{
  "data": {
    // dados da imagem do capítulo
  }
}

GET /chapter/image/:hash/:filename

Retorna a URL de uma imagem de capítulo.

Parâmetros de Rota:

    hash: Hash da imagem.
    filename: Nome do arquivo da imagem.

Exemplo de Resposta:

json

{
  "url": "https://uploads.mangadex.org/data/hash/filename"
}

POST /manga/cover-id

Retorna o ID da capa de um manga.

Corpo da Requisição:

json

{
  "mangaItem": {
    "relationships": [
      {
        "type": "cover_art",
        "id": "cover-id"
      }
    ]
  }
}

Exemplo de Resposta:

json

{
  "coverID": "cover-id"
}

css


Sinta-se à vontade para personalizar a descrição conforme necessário para se adequar ao seu projeto.
