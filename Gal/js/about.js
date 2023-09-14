let metadata; 

function modifyDescription(selectedValue) {
    // Matching the chart based on the selectedSample (user input based)
    return metadata.find(tick => tick.symbol === selectedValue);
}

// Define optionChanged function
function optionChanged(selectedValue) {
    const selectedTicker = modifyDescription(selectedValue);
    
    if (selectedTicker) {
        // Display the description of the selected ticker
        let h2 = d3.select('#dataset');
        h2.html(`
            <h2>About ${selectedTicker.name}<h2>
        `)
        let aboutDS = d3.select('#aboutDS');
        aboutDS.html(`
            <p>${selectedTicker.description}</p>
        `);
        console.log("Description: " + selectedTicker.description);
        // You can update your dashboard or UI here with the description
    } else {
        // Handle the case when the ticker is not found
        console.log("Ticker not found");
    }
}

// USING D3 TO READ JSON DATA -- DATA FUNNEL
const path = "CSV_Data/response.json";
d3.json(path).then(function(data) {
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
    });

}).catch(function(error) {
    // Catch Errors and log them to the console
    console.log('Error loading the JSON file: ' + error);
});
