import os
import pandas as pd
import time
import requests
import keys
from Constants import asx50

# Import api key from keys file
api_key = keys.alphaAPI

# Output folder for the stock data
output_folder = 'stockdata'

#_______________________________________MONTHLY______________________________________________
# Loop through each ASX 50 code and fetch monthly data
for code in asx50:
    # Define the API URL for the specific stock
    api_url = "https://www.alphavantage.co/query"
    data = {
        "function":"TIME_SERIES_MONTHLY",
        "symbol":f"{code}.ASX",
        "datatype":"csv",
        "apikey":api_key
    }

    # Send a GET request to the API
    response = requests.get(api_url,params=data)

    # Save the response content to a CSV file
    file_name = os.path.join(output_folder, f'{code}_monthly.csv')
    with open(file_name, 'wb') as file:
        file.write(response.content)
    print(f'Saved data for {code} to {file_name}')

    # AlphaVantage has max 5 calls per minute, set to 4 call per minute for stability.
    time.sleep(15)

#______________________________________OVERVIEW______________________________________________

df = pd.DataFrame()

# Loop through each ASX 50 code and fetch overview data
for code in asx50:
    # Define the API URL for the specific stock
    api_url = "https://www.alphavantage.co/query"
    data_overview = {
        "function":"OVERVIEW",
        "symbol":code,
        "apikey":api_key
    }

    # Send a GET request to the API
    response_overview = requests.get(api_url,params=data_overview)
    tempdf = pd.read_json(response_overview)

    df = pd.concat([df,tempdf], ignore_index = True)

    print(f"added data for {code} to Dataframe")


    # AlphaVantage has max 5 calls per minute, set to 4 call per minute for stability.
    time.sleep(15)

df.to_csv("overviewdata/overview_asx.csv", encoding='utf-8', index=False)
print("Dataframe converted to csv complete")
print('Data retrieval complete.')
