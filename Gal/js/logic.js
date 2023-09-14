// ! Subsets Variables
// ! #################################################################
let selectedDate;
let selectedEndDate;
let dates;


// ! Creating Functions - Functions Funnel
// ! #################################################################

function modifyDashboard(selectedValue) {
  // * matching the chart based on the selectedSample (user input based)
  let selectedTicker = tickers.find(tick => tick.name === selectedValue);
  let dateRange = dates.sort()
  let minDate = dateRange[0];
  let maxDate = dateRange[dateRange.length -1];

  // Default visuals
  if (!minDate || !maxDate) {
    // Apply default visuals (no date range specified)

  } else {
    // Apply visuals based on the date range (both minDate and maxDate are defined)
    // You can use minDate and maxDate here to filter your dashboard data
  };
  
  
  return selectedTicker}; 

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


// ! USING D3 TO READ JSON DATA -- DATA FUNNEL
// ! #################################################################
const path = "CSV_Data/response.json";
d3.json(path).then(function(data) {
    console.log(data);
    let metadata = data.metadata;
    let symbols = metadata.map(ticker => ticker.symbol);
    console.log(symbols);
    let tickers = data.tickers;
    let trades = data.trades;
    let sector = metadata.map(ticker => ticker.sector)
    const uniqueSector = [... new Set(sector)];
    console.log(uniqueSector);

    console.log("Sectors",  sector);
    console.log("Start Date: " + selectedDate, "End Date: " + selectedEndDate);

    // * Extracting each subset to a variable
    // TODO let tikers = data.tickes
    


    // ! TREATING THE TICKERS ARRAY 
    // ! ----------------------------------------------------------------
    const selectElement = document.getElementById("selDataset");
    symbols.forEach(ticker => {
        const option = document.createElement('option');
        option.text = ticker;
        option.value = ticker;
        selectElement.appendChild(option);
    });

    const sectorElement = document.getElementById("sector");
    uniqueSector.forEach(sect => {
      const optionSect = document.createElement('option');
      optionSect.text = sect;
      optionSect.value = sect;
      sectorElement.appendChild(optionSect);  
    })



  }).catch(function(error) {
    // * Catch Errors and log them to the console
    console.log('Error loading the JSON file: ' + error);
});
