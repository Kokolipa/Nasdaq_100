# Nasdaq 100 - Interactive Dashboard
## TLDR - Project Description - [![Leaflet-map](https://img.shields.io/badge/Dashboard-Presentation-black?style=flat&logo=atandt)](https://kokolipa.github.io/leaflet-challenge/) 
* Creating an interactive dashboard to explore the Nasdaq 100 share index using APIs to call the data, Python and SQLAlchemy to clean and transform the data, as well as loading the data to a SQLite database using SQLAlchemy's ORM.
* Reading the data from "nasdaq.sqlite" to create a Flask API.
* Rendering the Flask API using the D3 library and JavaScript to feed the HTML elements with data.
    * Dropdown buttons
    * Visuals 
    * A company description
* Reading data from the New York Times API to retrieve the most recent five corresponding articles for a given Nasdaq 100 share. 

##### Dashboard
![dashboard-image](https://github.com/Kokolipa/Nasdaq_100/blob/main/Dashboard_images/dashboard.png)
----------------------------------------------------------------
##### Information
![information-image](https://github.com/Kokolipa/Nasdaq_100/blob/main/Dashboard_images/information.png)



### Project outline - ETL 
----------------------------------------------------------------
![ETL](https://github.com/Kokolipa/Nasdaq_100/blob/main/Dashboard_images/image.png)


#### Extract: 
* **Data Extraction:** 
    * Calling the Alpha Vantage API to retrieve the Nasdaq index 100 trading data and metadata (an overview of each of the 101 companies within the index) from the last five years and return the data in jsonified format and CSV format. 
    * Extracting data from New York Times API (NYT) to retrieve the 5 latest corresponding **article snippets** for each share in Nasdaq 100 as well as the **web_url** for the article.
#### Transform: 
* **Data Cleansing, Manipulation and Transformation:** Transforming the jsonified and CSV data (metadata & trading data) into Pandas DataFrames and manipulating the data to create a unique ID for each ticker symbol for both of the datasets. Removing irrelevant columns and renaming the left columns to enhance clarity.
* **Database Creation**: Using SQLAlchemy **ORM** to create the seven tables and load them with the **declerative base**. The tables were created to achieve a normalised database (third normal form correspondence). Domain integrity was enforced by defining one allowable data type for each column. Key integrity was enforced by assigning a unique primary key for each record in each table. Referential integrity was enforced by assigning foreign keys and defining relationships between tables. 
* **NYT API** - Transforming the data returned from NYT to JSON format
* **Load**: 
    * Creating an API using Flask and SQLAlchemy. Loading data from the "nasdaq.sqlite" and assigning the data to each Flask route that was created. Two routes were created, one to retrieve all the data in jsonified format(a list of dicrionaries with two keys: **metadata**, **trades**, and **tickers**). 
    * Calling the API created with JavaScript D3 library to render the data and feed the interactive visuals that were created with Plotly and HighChart. 
    * Retrieving the data from the NYT to feed the HTML elements using JavaScript and D3. 
![ERD](https://github.com/Kokolipa/Nasdaq_100/blob/main/ETL/ERD.png)


### Dashboard Functionality: 
----------------------------------------------------------------
#### Dashboard
* The backend design was implemented with CSS and HTML. To ensure the design flexibility, we've used position relative and absolute as well as sizing HTML elements with percentages as opposed to pixels.
* To enable the modification of the dashboard based on a user selection, we stored within the HTML element a function and called it in the JavaScript code.
``` HTML
<label for="stock"><b>Select sector:</b></label>
<select id="sector" onchange="optionChanged(this.value)"></select>
<label for="stock"><b>Select a Stock:</b></label>
<select id="selDataset" onchange="optionChanged(this.value)"></select>
```
* The dashboard allows the selection from the sector and stock drop buttons.
* Initially, if a sector is selected, the dashboard will provide:
    * A candlestick chart to which summarise the trading period for the sector selected(inclusive, all time, based on the API GET call) and enable an overview of:
        * closing price, opening price, low price, and high price.
    * A bar chart to explore the volume per sector (inclusive of all time periods specified).
    * Pie chart to explore the market cap per sector. 
* Otherwise, if a stock was selected initially, the dashboard will provide: 
    * A breakdown info of the stock (name, sector, market cap, EBITDA, book value, dividend per share, and dividend yield).
    * A bar chart to explore the volume per share (inclusive all time periods specified).
    * Pie chart to explore the market cap per sector. 
    * A candlestick chart to summarise trading period for the share selected (inclusive, all time, based on the API GET call) and enable an overview of:
        * closing price, opening price, low price, and high price.
* If the default option was selected for both of the dropdown lists, all the visuals will be removed from the dashboard until a new selection is made.
##### About logic.js
To enable the above functionality, the logic was separated into two funnels.
1. **Functions funnel** => This funnel enables flexibility per selection and modifies the dashboard accordingly (based on the selection, the returned value from the subset created in the data funnel returned for plotting).
2. **Data funnel** => This funnel returns a subset of the data, structured to be easily accessed by the plotting libraries.
#### Information
* The information page includes one dropdown list containing the stocks. 
* When a stock is selected, the description of the company selected will be displayed, as well as the latest five articles from NYT if those articles are available.


#### Libraries & APIs Used
**Python Libraries:**
* Pandas
* JSON
* Flask
* SQLite
* SQLAlchemy
* Datetime
* os
* Time
* requests

**JavaScript Libraries:**
* Plotly
* HighCharts
* D3

**APIs:**
* New York Times
* Alpha Vantage 

#### Languages:
1. Python
2. JavaScript
3. CSS
5. HTML
6. SQL



#### Folder structure
``` yml
.
│   ├── ETL 
│   |   ├── clean_db_data                    # This folder contains the database tables
│   |   |   ├── clean_asset_type.csv
│   |   |   ├── clean_country.csv
│   |   |   ├── clean_currency.csv
│   |   |   ├── clean_industry.csv
│   |   |   ├── clean_metadata.csv
│   |   |   ├── clean_sector.csv
│   |   |   ├── clean_trade_data.csv
│   |   ├── ERD.png            
│   |   ├── alpha_vantage_constants.py             
│   |   ├── alpha_vantage_extract.ipynb             
│   |   ├── alpha_vantage_load.ipynb             
│   |   ├── alpha_vantage_transform.ipynb            
│   |   ├── nasdaq.sqlite                   # This is the database             
│   ├── flask_sqlite     
│   |   ├── routes      
│   |   |   ├── __pycache__
│   |   |   |   ├── get_all_data.cpython-310.pyc
│   |   |   |   ├── get_data_by_date.cpython-310.pyc
│   |   |   |   ├── get_data_by_sector.cpython-310.pyc
│   |   |   ├── get_all_data.py
│   |   |   ├── get_data_by_date.py 
│   |   ├── app.py                          # To run the api use the file (commend => python app.py)                      
│   ├── html_css_js                         # This folder contains the JavaScript, the CSS, and the HTML code 
│   |   ├── CSS        
│   |   |   ├── about.css
│   |   |   ├── index.css
│   |   ├── CSV_Data                        # This folder contains the CSV data for "all the data returned by the API "      
│   |   |   ├── nytimes_articles.json       # This folder contains the data extracted from the NYT API 
│   |   |   ├── response.json
│   |   ├── Icons                      
│   |   |   ├── dashboard.png
│   |   |   ├── info.png
│   |   |   ├── stock_image2.jpeg
│   |   |   ├── stocks_image.jpeg
│   |   ├── js             
│   |   |   ├── about.js
│   |   |   ├── logic.js
│   |   ├── CSV_Data            
│   |   |   ├── nytimes_articles.json
│   |   |   ├── response.json
│   |   ├── about.html                                             
│   |   ├── index.html                                              
│   ├── NYTimes API                                     
│   |   ├── Constants.py                                            
│   |   ├── import_articles.py        
│   ├── Dashboard_images                                   
│   |   ├── dashboard.png                                           
│   |   ├── image.png                                      
│   |   ├── information.png                                      
|___README.md
|___.gitignore
|___nytimes_articles.json                    
``` 