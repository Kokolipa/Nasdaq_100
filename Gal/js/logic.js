// ! Subsets Variables
// ! #################################################################
let selectedDate;
let selectedEndDate;


// ! Creating Functions - Functions Funnel
// ! #################################################################
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
  

// * Create a function to retreive the start date & end date --> The function will filter the data based on the date range
    // * The second condition will be that if user only applied one date object (start/end date) then the output be "please select End date/Start Date" AS PRORMPT

// USING D3 TO READ JSON DATA -- DATA FUNNEL
// #################################################################
// ? then function used to handle successfull JSON data 
// ? catch function handles any errors that might occur during the loading process
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data) {
    // * confirming the data was migrated correctly
    console.log(data);
    console.log("Start Date: " + selectedDate, "End Date: " + selectedEndDate);
}).catch(function(error) {
    console.log('Error loading the JSON file: ' + error);
});
