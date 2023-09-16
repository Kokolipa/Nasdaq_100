// ! Subsets Variables
// ! #################################################################
let selectedDate;
let selectedEndDate;
let tradesData; 
let metadata; 
let breakdownInfo;
let PieChart


// ! Creating Functions - Functions Funnel
// ! #################################################################
// * A function to modify the dashboard based on the selected value
// * #################################################################
function modifyDashboard(selectedValue) {
  const chartContainer = document.getElementById('timeline');

  if (selectedValue === "") {
    alert("Please select a trade");
    // Hide the chart container when the default option is selected
    chartContainer.style.display = 'none';

  } else {
    const selectedTrade = tradesData.find(trade => trade.symbol === selectedValue);

    if (!selectedTrade) {
      alert("Trade not found");
      // Hide the chart container when an invalid trade is selected
      chartContainer.style.display = 'none';
    } else {
      const dates = selectedTrade.date.sort((a, b) => new Date(a) - new Date(b));
      const close = selectedTrade.close;
      const high = selectedTrade.high.sort((a, b) => a - b);
      const low = selectedTrade.low.sort((a, b) => a - b);
      const open_price = selectedTrade.open;
      console.log("Open Price:", open_price);

      const trace1 = {
        x: dates,
        close: close,
        decreasing: { line: { color: '#FF00F1' } },
        high: high,
        increasing: { line: { color: '#00FFD8' } },
        line: { color: 'rgba(31,120,180,2)' },
        low: low,
        open: open_price,
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y',
      };

      const data = [trace1];

      const layout = {
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
              color: 'white',
            },
          },
          type: 'date',
          showline: true,
          linecolor: 'rgba(4, 24, 120, 0.8)',
          layer: 'below',
          fixedrange: true,
          zeroline: false,
          tickfont: {
            color: 'white',
          },
        },
        yaxis: {
          autorange: true,
          domain: [0, 1],
          range: [Math.min(...low), Math.max(...high)],
          type: 'linear',
          showgrid: true,
          gridcolor: 'rgba(0, 255, 102, 0.7)',
          tickfont: {
            color: 'white',
          },
        },
        plot_bgcolor: 'rgba(128, 128, 128, 0.25)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: {
          text: `${selectedValue}`,
          color: 'white'
        }
      };

      Plotly.newPlot('timeline', data, layout);

      // * Plotting the Breakdown info
      // * #################################
      let selectedMetadata = breakdownInfo.find(field => field.symbol === selectedValue);
      let panelBody = d3.select('#breakdown');
      console.log(selectedMetadata)
      panelBody.html(`
          <p><strong>Name:</strong> ${selectedMetadata.name}</p>
          <p><strong>Sector</strong>: ${selectedMetadata.sector}</p>
          <p><strong>Market Cap:</strong> ${selectedMetadata.market_cap}</p>
          <p><strong>EBITDA:</strong> ${selectedMetadata.EBITDA}</p>
          <p><strong>Book Value:</strong> ${selectedMetadata.book_value}</p>
          <p><strong>Dividend Yeild:</strong> ${selectedMetadata.dividend_yeild}</p>
          <p><strong>Share Dividend:</strong> ${selectedMetadata.dividend_per_share}</p>
      `)

      // * Plotting the Breakdown info
      // * #################################
      let pieData = [{
        type: 'pie',
        values: PieChart.market_cup,
        labels: PieChart.Unique_Sector,
        marker: {
          colors: ['#7A1DAC', '#00FFC5', '#6839C5', '#AAFF00', '#E4FF00', '#FF8008']
        }
      }];
      
      let layout2 = {
        height: 489,
        width: 450,
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        margin: {
          l: 60,
          r: 120,
          t: 40,
          b: 80,
        },

      };
      
      Plotly.newPlot('pie', pieData, layout2);
      
      // Show the chart container when a valid trade is selected
      chartContainer.style.display = 'block';
    }
  }
}








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
// http://127.0.0.1:5000/ All is good!! 
const path = "CSV_Data/response.json";
d3.json(path).then(function(data) {
    console.log(data);

    // * Extracting each subset to a variable
    let trades = data.trades;
    console.log(trades);
    metadata = data.metadata;
    
    // * Validating symbols creation
    console.log(metadata);
    let symbols = metadata.map(ticker => ticker.symbol);
    console.log(symbols);

    // ! Creating the trades data => 
    // ! #################################################################
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
    console.log("Trades Dataset", tradesData);

    let sector = metadata.map(ticker => ticker.sector)
    let uniqueSector = [... new Set(sector)];
    console.log(uniqueSector);

    console.log("Sectors",  sector);
    console.log("Start Date: " + selectedDate, "End Date: " + selectedEndDate);


    // ! Creating the breakdown information to display the information per stock =>
    // ! #################################################################
    breakdownInfo = [];

    for (i = 0; i < metadata.length; i++) {

      let meta  = metadata[i];
      metaInfo = {
        'symbol': meta.symbol,
        "name": meta.name,
        "sector": meta.sector,
        "market_cap": meta.market_cap.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
        "EBITDA": meta.ebitda.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
        'book_value': meta.book_value,
        'dividend_yeild': meta.dividend_yeild,
        'dividend_per_share': meta.dividend_per_share
      };

      breakdownInfo.push(metaInfo);
    }
    console.log("Metadata Information: ", breakdownInfo);
    
    // ! Creating the PieChart
    // ! #################################################################
    let marketSum = metadata.map(summary => summary.market_cap).reduce(function(a,b) {return a + b;});
    let marketCup = metadata.map(summary => summary.market_cap);
    // * Validating marketSum 
    console.log(marketSum);

    let technology = metadata.filter(field => field.sector === uniqueSector[0]).map(field => field.market_cap).reduce(function(a,b) {return a + b;});
    let trades_services = metadata.filter(field => field.sector === uniqueSector[1]).map(field => field.market_cap).reduce(function(a,b) {return a + b;});
    let manufacturing = metadata.filter(field => field.sector === uniqueSector[2]).map(field => field.market_cap).reduce(function(a,b) {return a + b;});
    let life_sciences = metadata.filter(field => field.sector === uniqueSector[3]).map(field => field.market_cap).reduce(function(a,b) {return a + b;});
    let energy_transportation = metadata.filter(field => field.sector === uniqueSector[4]).map(field => field.market_cap).reduce(function(a,b) {return a + b;});
    let real_estate = metadata.filter(field => field.sector === uniqueSector[5]).map(field => field.market_cap).reduce(function(a,b) {return a + b;});

    PieChart = {
      "market_cup": [technology, trades_services, manufacturing, life_sciences, energy_transportation, real_estate]
        .map(value => (value / marketSum) * 100)
        .map(value => parseFloat(value.toFixed(2))),
      "Unique_Sector": uniqueSector
    };
    
    console.log("Pie Chart: ", PieChart);




    // ! TREATING THE DROP BUTTON LISTS
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

    // modifyDashboard(symbols[0]);
  }).catch(function(error) {
    // * Catch Errors and log them to the console
    console.log('Error loading the JSON file: ' + error);
});
