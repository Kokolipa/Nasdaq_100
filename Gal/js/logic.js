// ! Subsets Variables
// ! #################################################################



// ! Creating Functions - Functions Funnel
// ! #################################################################


// USING D3 TO READ JSON DATA -- DATA FUNNEL
// #################################################################
// ? then function used to handle successfull JSON data 
// ? catch function handles any errors that might occur during the loading process
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data) {
    // * confirming the data was migrated correctly
    console.log(data);
}).catch(function(error) {
    console.log('Error loading the JSON file: ' + error);
});
