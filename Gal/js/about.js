let metadata;
let nytArticles;

function modifyDescription(selectedValue) {
    // Matching the chart based on the selectedSample (user input based)
    return metadata.find(tick => tick.symbol === selectedValue);
}

function appendArticles(selectedValue) {
    // Filter articles based on the selectedValue
    const selectedArticles = nytArticles[selectedValue];

    // Select the 'links' and 'valuablelinks' elements
    const h2 = d3.select('#links');
    const valuablelinks = d3.select('#valuablelinks');

    // Clear the existing content in 'valuablelinks'
    valuablelinks.html('');

    // Create an ordered list of links to the selected articles
    const ol = valuablelinks.append('ol');

    if (selectedArticles && selectedArticles.length) {
        // Set the heading for the selected articles
        h2.html(`<h2>Valuable links for ${selectedValue}</h2>`);

        selectedArticles.forEach(article => {
            // Create a list item with a link to the article's web_url
            const li = ol.append('li');
            li.append('a')
                .attr('href', article.web_url)
                .text('Click here for more info');

            // Append the snippet as plain text
            li.append('p')
                .text(article.snippet);
        });
    } else {
        // Handle the case when no articles are found for the selected ticker
        h2.html(`<h2>No valuable links found for ${selectedValue}</h2>`);
        console.log("No articles found");
    }
}


// Define optionChanged function
function optionChanged(selectedValue) {
    const selectedTicker = modifyDescription(selectedValue);
    
    if (selectedTicker) {
        let h2 = d3.select('#dataset');
        h2.html(`
            <h2>About ${selectedTicker.name}<h2>
        `)
        let aboutDS = d3.select('#aboutDS');
        aboutDS.html(`
            <p>${selectedTicker.description}</p>
        `);
        console.log("Description: " + selectedTicker.description);
    } else {
        // Handle the case when the ticker is not found
        console.log("Ticker not found");
    }
}

// USING D3 TO READ JSON DATA -- DATA FUNNEL
const url = "CSV_Data/response.json";
d3.json(url).then(function(data) {
    console.log(data);
    metadata = data.metadata;
    let symbols = metadata.map(ticker => ticker.symbol).sort();

    // TREATING THE TICKERS ARRAY
    const selectElement = document.getElementById("selDataset");
    symbols.forEach(ticker => {
        const option = document.createElement('option');
        option.text = ticker;
        option.value = ticker;
        selectElement.appendChild(option);
    });

    // Adding an event listener to the dropdown for when the user selects a ticker
    selectElement.addEventListener("change", function() {
        const selectedValue = selectElement.value;
        optionChanged(selectedValue);
        appendArticles(selectedValue); 
    });

}).catch(function(error) {
    // Catch Errors and log them to the console
    console.log('Error loading the JSON file: ' + error);
});

let path = 'CSV_Data/nytimes_articles.json';

d3.json(path).then(function(data) {
    nytArticles = data
    console.log(nytArticles)
});
