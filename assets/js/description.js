async function fetchWikipediaSummary(searchTerm) {
    const endpoint = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const page = data.query.pages;
        const pageId = Object.keys(page)[0];
        return page[pageId].extract;
    } catch (error) {
        console.error('Fetching Wikipedia summary failed: ', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const cityName = params.get('city');

    if (cityName) {
        fetchWikipediaSummary(cityName).then(summary => {
            if (summary) {
                document.getElementById('description').innerText = summary;
            } else {
                document.getElementById('description').innerText = "Description not found.";
            }
        });
    }
});