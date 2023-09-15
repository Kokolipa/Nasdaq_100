// ! Subsets Variables
// ! #################################################################
let selectedDate;
let selectedEndDate;
let tradesData; 
let metadata; 
let dates; 


// ! Creating Functions - Functions Funnel
// ! #################################################################

function modifyDashboard(selectedValue) {
  // * matching the chart based on the selectedSample (user input based)
    let selectedTrade = tradesData.filter(trade => trade.symbol === selectedValue);

      let dates = selectedTrade[0].date.sort();
      let close = selectedTrade[0].close;
      let high = selectedTrade[0].high.sort(function(a, b) {return a-b});
      let low = selectedTrade[0].low.sort(function(a, b) {return a-b});
      let open_price = selectedTrade[0].open;
      console.log("Open Price:", open_price);
      let trace1 = {
        x: dates,
        close: close,
        decreasing: {line: {color: '#FF00F1'}}, 
        high: high,
        increasing: { line: { color: '#00FFD8' } },
        line: { color: 'rgba(31,120,180,2)' },
        low: low,
        open: open_price,
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      };
  
      let data = [trace1];
  
      let layout = {
        dragmode: 'zoom',
        margin: {
           r: 10,
          t: 25,
          b: 40,
          l: 60,
        },
        showlegend: false,
        xaxis: {  
          autorange: true,
          domain: [0, 1],
          range: [dates[0], dates[dates.length - 1]],
          rangeslider: { range: [dates[0], dates[dates.length - 1]] },
          title: {
            text: 'Date',
            font: {
              color: 'white'
            }
          },
          type: 'date',
          showline: true, 
          linecolor: 'rgba(4, 24, 120, 0.8)',
          layer: 'below', 
          fixedrange: true, 
          zeroline: false, 
          tickfont: {
            color: 'white'
          }
        },
        yaxis: {
          autorange: true,
          domain: [0, 1],
          range: [low[0], high[high.length - 1]],
          type: 'linear',
          showgrid:true,
          gridcolor: 'rgba(0, 255, 102, 0.7)',
          tickfont: {
            color: 'white'
          }
        },
        plot_bgcolor: 'rgba(128, 128, 128, 0.25)',
        paper_bgcolor: 'rgba(0,0,0,0)',
      };
  
      Plotly.newPlot('timeline', data, layout);
      return selectedTrade;
  };

// * Create a function to retreive the start date & end date --> The function will filter the data based on the date range
    // * The second condition will be that if user only applied one date object (start/end date) then the output be "please select End date/Start Date" AS PRORMPT
document.addEventListener("DOMContentLoaded", function() {
    let dateInput = document.getElementById("dateRange_initial");
    let endDateInput = document.getElementById("dateRange_end"); 

    dateInput.addEventListener("change", function() {
      // Get the selected date value from the input element
      selectedDate = dateInput.value;
      
      if (!endDateInput.value){ 
        alert("Please select End date");
      } else {
        console.log("Start Date: " + selectedDate, "End Date: " + endDateInput.value);
      }
    });
  
    endDateInput.addEventListener("change", function() {
      // Get the selected date value from the input element
      selectedEndDate = endDateInput.value;
      
      if (!dateInput.value){
        alert("Please select Start date");
      } else {
        console.log("Start Date: " + dateInput.value, "End Date: " + selectedEndDate);
      }
    });
  });



function optionChanged(selectedValue) {
    modifyDashboard(selectedValue);
    // Add a second conditino to filter by the date range if selected
}


// A function to modify the sector

// ! #################################################################
// ! USING D3 TO READ JSON DATA -- DATA FUNNEL
// ! #################################################################
const path = "CSV_Data/response.json";
d3.json(path).then(function(data) {
    console.log(data);

    // Creating the metadata and validating creation of metadata
    metadata = data.metadata;
    // Validating symbols creation
    let symbols = metadata.map(ticker => ticker.symbol);
    console.log(symbols);

    dates= data
    let tickers = data.tickers;
    // Creating the trades data => 
    let trades = data.trades;
    console.log(trades);
    tradesData = [];
    for (i = 0; i < trades.length; i++) {
      let trade = trades[i];
      // Create an object with the desired properties
      let tradeObj = {
          'symbol': symbols[i],
          'close': trade.close,
          'date': trade.date, 
          'high': trade.high,
          'low': trade.low,
          'open': trade.open_price,
          'volume': trade.volume
      };
      tradesData.push(tradeObj);
    };
    let test = tradesData.filter(symbol => symbol.symbol === 'AAPL')
    console.log("Trades Dataset", test  );
    let sector = metadata.map(ticker => ticker.sector)
    const uniqueSector = [... new Set(sector)];
    console.log(uniqueSector);

    console.log("Sectors",  sector);
    console.log("Start Date: " + selectedDate, "End Date: " + selectedEndDate);

    // * Extracting each subset to a variable
    // TODO let tikers = data.tickes
    


    // ! TREATING THE TICKERS ARRAY 
    // ! ----------------------------------------------------------------
    // Creating a default option for tickers and appending all the options 
    const selectElement = document.getElementById("selDataset");
    const defaultOption = document.createElement('option');
    defaultOption.text = "Select an option";
    defaultOption.value = ""; 
    selectElement.appendChild(defaultOption);
    symbols.forEach(ticker => {
        const option = document.createElement('option');
        option.text = ticker;
        option.value = ticker;
        selectElement.appendChild(option);
    });

    // Creating a default option for Secors and appending all the options
    const sectorElement = document.getElementById("sector");
    const defaultSectorOption = document.createElement("option");
    defaultSectorOption.text = "Select a sector";
    defaultSectorOption.value = "";
    sectorElement.appendChild(defaultSectorOption);
    uniqueSector.forEach(sect => {
      const optionSect = document.createElement('option');
      optionSect.text = sect;
      optionSect.value = sect;
      sectorElement.appendChild(optionSect);  
    })

    modifyDashboard(symbols[0]);
  }).catch(function(error) {
    // * Catch Errors and log them to the console
    console.log('Error loading the JSON file: ' + error);
});
