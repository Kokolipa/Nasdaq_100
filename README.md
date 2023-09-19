# Nasdaq 100 - Interactive Dashboard
## TLDR - Project Description - [![Presentation](https://img.shields.io/badge/Presentation-red?style=flat&logo=codereview)](https://docs.google.com/presentation/d/1TGgtrsVOVzgK9oL2wOtrSuxz2anh69CpDysVYDjF-t4/edit#slide=id.g23188ea39e2_0_61)
* Creating an interactive dashboard to explore the Nasdaq 100 share index using API's to call the data, Python and SQLAlchemy to clean and transform the data as well loading the data to a SQLite database using SQLAlchemy's ORM.
* Reading the data from "nasdaq.sqlite" to create a Flask API.
* Rendering the Flask API using D3 library and JavaScript to feed the HTML elements with data.
    * Dropdown buttons
    * Visuals 
    * A company description
* Reading data from the New York Times API to retrieve the most recent five corresponding articles for a given Nasdaq 100 share. 

<!-- TODO => Add Dashboard Images HERE -->


<!-- TODO => Add the ETL Image HERE -->
### Project outline - ETL 
----------------------------------------------------------------
#### Extract: 
* **Data Extraction:** 
    * Calling the Alpha Vantage API to retrive the Nasdaq index 100 trading data and metadata (an overview of each of the 101 companies within  the index) from the last 5 years and return the data in jsonified format. 
    * Extracting data from New York Times API (NYT) to retrieve the 5 latest corresponding **article snippits** for each share in Nasdaq 100 as well as the **web_url** for the article.
#### Transform: 
* **Data Cleasing, Manipulation and Transformation:** Transforming the jsonified data (meta data & trading data) into Pandas DataFrames and manipulating the data to create unique ID for each ticker symbol for both of the datasets. Removing irrelevant columns and renaming the left columns to enhance the clarity.
* **Database Creation**: Using SQLAlchemy **ORM** to create the seven tables and load them with the **declerative base**. The tables were created to achieve a normalised database (third normal form correspondance). Domain integrity was enforced by defining one allowable data type for each column. Key integrity was enforced by assigning a unique primary key for each record in each table. Referential integrity was enforced by assigning foreign keys and defining relationships between tables. 
* **NYT API** - Transforming the data returned from NYT to JSON format
* **Load**: 
    * Creating an API using Flask and SQLAlchemy. Loading data from the "nasdaq.sqlite" and assigning and the data to each Flask route that was created. Two routes were created, one to retrive all the data in jsonified format(a list of dicrionaries with two keys: **matadata**, **trades**, and **tickers**). 
    * Calling the API created with JavaScript D3 library to render the data and feed the interactive visuals there were created with Plotly and HighChart. 
    * Retriving the data from the NYT to feed the HTML elements using JavaScript and D3. 
<!-- TODO => Add the ERD Image HERE -->

### Dashboard Functionality: 
----------------------------------------------------------------
#### Dashboard
* The dashboard allow the selection from the the sector and stock drop buttons.
* Initially, if sector is selected, the dashboard will provide:
    * A candlestick chart to which summurise trading period for the sector selected(inclusive, all time, based on the api GET call) and enable an overview of:
        * closing price, opening price, low price, and high price.
    * A bar chart to explore the volume per sector (inclusive, all time period specified).
    * Pie chart to explore the market cap per sector. 
* Otherwise, if a stock was selected initially, the dashboard will provide: 
    * A breakdown info of the stock (name, sector, market cap, EBITDA, book value, dividend per share, and dividend yeild).
    * A bar chart to explore the volume per share (inclusive, all time period specified).
    * Pie chart to explore the market cap per sector. 
    * A candlestick chart to which summurise trading period for the share selected (inclusive, all time, based on the api GET call) and enable an overview of:
        * closing price, opening price, low price, and high price.
* If default option was selected for both of the dropdown lists, all the visuals will be removed from the dashboard until new selection is made.
#### Information
* The information page includes one dropdown list containing the stocks. 
* When a stock is selected, the description of the company selected will be displayed as well as the latest five articles from NYT if those articles are available.


#### Libraries & APIs Used
**Python Libraries:**
* Pandas
* JSON
* Flask
* SQLite
* SQLAlchemy
* Datetime
* os
* time
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
│   |   ├── about.html                                             
│   |   ├── index.html                                              
│   ├── Python Scripts  
│   |   ├── Combine_data.py                                             
│   |   ├── Constants.py                                            
│   |   ├── import_articles.py                                              
│   |   ├── Import_overview.py
│   |   ├── import_timeseries.py                                              
|___README.md
|___.gitignore
|___nytimes_articles.json                    
``` 