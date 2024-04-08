async function fetchWikipediaSummary(searchTerm, maxWords = 100) {
    const endpoint = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts%7Cpageimages&exintro&explaintext&redirects=1&origin=*&titles=${encodeURIComponent(searchTerm)}&pithumbsize=1000`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const page = data.query.pages;
        const pageId = Object.keys(page)[0];
        let extract = page[pageId].extract;
        let imageUrl = page[pageId].thumbnail ? page[pageId].thumbnail.source : '';

        // Truncate the extract to the specified number of words
        extract = extract.split(" ").slice(0, maxWords).join(" ");

        // Add 'Keep Reading' link
        const articleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchTerm)}`;
        extract += `... <a href="${articleUrl}" class="link" target="_blank">Continue Reading...</a>`;

        return { extract, imageUrl };
    } catch (error) {
        console.error('Fetching Wikipedia summary failed: ', error);
        return { extract: null, imageUrl: null };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    let cityName = params.get('city');
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

    if (cityName) {
        fetchWikipediaSummary(cityName).then(data => {
            if (data.extract) {
                document.getElementById('description').innerHTML = `<h5 class="card-title">${cityName}</h5>
                <p class="hero-text">${data.extract}</p>`;
                if (data.imageUrl) {
                    document.getElementById('image-city').innerHTML = `<img src="${data.imageUrl}" alt="${cityName}" style="max-width:100%; margin-top:18px;">`;
                }
            } else {
                document.getElementById('description').innerText = "Description not found.";
                document.getElementById('image-city').innerText = "Image not found.";
            }
        });
    }
});