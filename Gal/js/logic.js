// ! Subsets Variables
// ! #################################################################
let selectedDate;
let selectedEndDate;
let tradesData; 
let metadata; 
let breakdownInfo;
let PieChart;
let sectorTrades;
let uniqueSector;


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

  } 
  else if (selectedValue in sectorTrades) {
    const selectedSectorData = sectorTrades[selectedValue];

    if (!selectedSectorData) {
      alert("Trade not found");
      chartContainer.style.display = 'none';
    }
    else{
      // * Plot the CandleStick chart
      // * #################################
      const dates = selectedSectorData.dates;
      const close = selectedSectorData.close;
      const high = selectedSectorData.high;
      const low = selectedSectorData.low;
      const open_price = selectedSectorData.open;
      const volumes = selectedSectorData.volume;
      console.log(dates)

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
        title: {
          text: `Trading summary for ${selectedValue}`,
          font: {
            color: 'white',
          },
          margin: {
            l: 0,
            r: 0,
            t: 40, 
            b: 0,
          },
        },
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
          }
        },
        plot_bgcolor: 'rgba(128, 128, 128, 0.25)',
        paper_bgcolor: 'rgba(0,0,0,0)',
      };

      Plotly.newPlot('timeline', data, layout);

      // * Plotting the Pie Chart info
      // * #################################
      let pieData = [{
        type: 'pie',
        values: PieChart.market_cup,
        labels: PieChart.Unique_Sector,
        marker: {
          colors: ['#04FFCE', '228BA9', '#2FBAC6', '#6442CF', '#CC11FA', '#7A1DAC']
        }
      }];
      
      let layout2 = {
        height: 489,
        width: 450,
        title: {
          text: "Market Capitalisation by Sector",
          font: {
            color: 'white'
          }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        margin: {
          l: 25,
          r: 70,
          t: 35,
          b: 70,
        },
        labels: {
          font: {
            color: 'white'
          }
        }

      };
      
      Plotly.newPlot('pie', pieData, layout2);

      chartContainer.style.display = 'block';

      // ! Khai's bar chart - BAR CHART
      // ! #################################
      date_volume_list = dates.map(function(e,i) {
        return [new Date(e).getTime(),volumes[i]];
      })

      let barchart = new Highcharts.Chart({
        chart: {
            renderTo: 'bar',
            type: 'column',
            backgroundColor: '#0B0544',
            plotBackgroundColor: '#483d8b',
        },
        title: {
            text: "Volume time series for " + selectedValue + " Sector",
            style:{
                color: 'white',
            }
        },
        series: [{
            data: date_volume_list,
            //color: '#BDFF00',
            borderColor: '#483d8b',
            borderWidth: 1,
        }],
        xAxis: {
            type: 'datetime',
            labels:{
                style:{
                    color: 'white',
                },
                formatter: function() {
                    return Highcharts.dateFormat('%b, %Y', this.value);
                }
            },
        },
        yAxis: {
            labels:{
                style:{
                    color: 'white',
                }
            },
            title:{
                text: 'Volume',
                style: {
                    color: 'white',
                    fontSize: '16px',
                }
            }
        },
        plotOptions:{
            column:{
                pointWidth:24,
                pointPadding: 0.3, // Set pointPadding to control the space between columns
                groupPadding: 0.3, // Set groupPadding to control the space between groups of columns
            }
        },
        legend: {
            enabled: false,
        },
      })

    }
  }
  else {
    const selectedTrade = tradesData.find(trade => trade.symbol === selectedValue);

    if (!selectedTrade) {
      alert("Trade not found");
      // Hide the chart container when an invalid trade is selected
      chartContainer.style.display = 'none';
    } else {
      // * Plot the CandleStick chart
      // * #################################
      const dates = selectedTrade.date;
      const close = selectedTrade.close;
      const high = selectedTrade.high;
      const low = selectedTrade.low;
      const open_price = selectedTrade.open;
      const volumes = selectedTrade.volume;
      console.log("Open Price:", open_price);
      console.log("dates:", dates);

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
        title: {
          text: `Trading summary for ${selectedValue}`,
          font: {
            color: 'white',
          },
          margin: {
            l: 0,
            r: 0,
            t: 40, 
            b: 0,
          },
        },
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
          }
        },
        plot_bgcolor: 'rgba(128, 128, 128, 0.25)',
        paper_bgcolor: 'rgba(0,0,0,0)',
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
          <p><strong>Book Value:</strong> $${selectedMetadata.book_value}</p>
          <p><strong>Dividend Yeild:</strong> %${(selectedMetadata.dividend_yeild * 100).toFixed(2)}</p>
          <p><strong>Annual Dividend:</strong> $${selectedMetadata.dividend_per_share}</p>
      `)

      // * Plotting the Pie Chart info
      // * #################################
      let pieData = [{
        type: 'pie',
        values: PieChart.market_cup,
        labels: PieChart.Unique_Sector,
        marker: {
          colors: ['#04FFCE', '228BA9', '#2FBAC6', '#6442CF', '#CC11FA', '#7A1DAC']
        }
      }];
      
      let layout2 = {
        height: 489,
        width: 450,
        title: {
          text: "Market Capitalisation by Sector",
          font: {
            color: 'white'
          }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        margin: {
          l: 25,
          r: 70,
          t: 35,
          b: 70,
        },
        labels: {
          font: {
            color: 'white'
          }
        }

      };
      
      Plotly.newPlot('pie', pieData, layout2);
      
      // Show the chart container when a valid trade is selected
      chartContainer.style.display = 'block';

      date_volume_list = dates.map(function(e,i){
        return [new Date(e).getTime(),volumes[i]];
      })

      var barchart = new Highcharts.Chart({
        chart: {
            renderTo: 'bar',
            type: 'column',
            backgroundColor: '#0B0544',
            plotBackgroundColor: '#483d8b',
        },
        title: {
            text: "Volume time series for " + selectedValue,
            style:{
                color: 'white',
            }
        },
        series: [{
            data: date_volume_list,
            //color: '#BDFF00',
            borderColor: '#483d8b',
            borderWidth: 1,
        }],
        xAxis: {
            type: 'datetime',
            labels:{
                style:{
                    color: 'white',
                },
                formatter: function() {
                    return Highcharts.dateFormat('%b, %Y', this.value);
                }
            }
        },
        yAxis: {
            labels:{
                style:{
                    color: 'white',
                }
            },
            title:{
                text: 'Volume',
                style: {
                    color: 'white',
                    fontSize: '16px',
                }
            }
        },
        plotOptions:{
            column:{
                pointWidth:12,
            }
        },
        legend: {
            enabled: false,
        },
      })
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
    // Add a second condition to filter by the date range if selected
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
    metadata = data.metadata;
    
    // * Validating symbols creation
    let symbols = metadata.map(ticker => ticker.symbol);
    console.log(symbols);

    let sector = metadata.map(ticker => ticker.sector)
    uniqueSector = [... new Set(sector)];
    console.log(uniqueSector);

    console.log("Sectors",  sector);
    console.log("Start Date: " + selectedDate, "End Date: " + selectedEndDate);

    // ! Creating the trades data => 
    // ! #################################################################
    tradesData = [];
    for (i = 0; i < trades.length; i++) {
      let trade = trades[i];
      // Create an object with the desired properties
      let tradeObj = {
          'sector': sector[i],
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

// ! (A) Creating the SECTOR trades => 
    // ! (A) #################################################################
    // Initialize an empty object to store grouped data
    let groupedData = [];
    tradesData.forEach(item => {
    let sector = item.sector;

    if (!groupedData[sector]) {
    groupedData[sector] = [];
    }
    // Add the current item to the corresponding sector's array
    groupedData[sector].push(item);
    });
    console.log("Grouped Data", groupedData);
    let dateValues = [... new Set(groupedData['Technology'][0].date)];

    console.log(dateValues, "Date Values")
    
    // * Defining a function to calculate the mean value for each element in a sector array =>
    function calculateMean(arr) {
      const sum = arr.reduce((acc, value) => acc + value, 0);
      return sum / arr.length;
    }
    
    // ! (B) Updating SectorTrades
    sectorTrades = []; 
    for (const sector in groupedData) {
      const sectorData = groupedData[sector]; // Getting the data for the current sector

    // Initialize an object to store means for this sector
    const sectorMeansData = {
      dates: [],
      close: [],
      high: [],
      open: [],
      low: [],
      volume: [],
    };

    for (let i = 0; i < sectorData.length; i++) {
      // Calculate the mean for each property and store it in the sectorMeansData object
      sectorMeansData.dates.push(dateValues[i]);
      sectorMeansData.close.push(calculateMean(sectorData[i].close));
      sectorMeansData.high.push(calculateMean(sectorData[i].high));
      sectorMeansData.open.push(calculateMean(sectorData[i].open));
      sectorMeansData.low.push(calculateMean(sectorData[i].low));
      sectorMeansData.volume.push(calculateMean(sectorData[i].volume));
    }

    // Store the calculated means for this sector in the sectorMeans object
    sectorTrades[sector] = sectorMeansData;
  }

    console.log("Sector Trades", sectorTrades);

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

Highcharts.setOptions({
    chart: {
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(240, 240, 255)']
            ]
        },
        borderWidth: 2,
        plotBackgroundColor: 'rgba(255, 255, 255, .9)',
        plotShadow: true,
        plotBorderWidth: 1
    }
});