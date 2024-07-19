async function fetchMangaPages() {
  const mangaName = document.getElementById('manga-name').value;
  const chapterNumber = document.getElementById('chapter-number').value;
  const imagesContainer = document.getElementById('images-container');
  imagesContainer.innerHTML = '';

  if (!mangaName || !chapterNumber) {
    alert('Please enter both manga name and chapter number');
    return;
  }

  const response = await fetch(`https://minimalist-api-manga-80bcxz7h0-fabiobrasileiroos-projects.vercel.app/pages/${mangaName}/${chapterNumber}`);
  if (response.ok) {
    const imageUrls = await response.json();
    imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      imagesContainer.appendChild(img);
    });
  } else {
    imagesContainer.innerHTML = `<p>Error: ${response.statusText}</p>`;
  }
}
