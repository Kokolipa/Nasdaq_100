import os
import pandas as pd
import time
import requests
import keys
from Constants import ndq100

# Import api key from keys file
api_key = keys.alphaAPI

# Output folder for the stock data
output_folder = '../stockdata'

#______________________________________OVERVIEW______________________________________________

df = pd.DataFrame()
progress = 0
# Loop through each ASX 50 code and fetch overview data
for code in ndq100:
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
    progress += 1
    print(f"added data for {code} to Dataframe")
    print(f"Current progress {progress} out of 100")


    # AlphaVantage has max 5 calls per minute, set to 4 call per minute for stability.
    time.sleep(15)

df.to_csv("../overviewdata/overview_asx.csv", encoding='utf-8', index=False)
print("Dataframe converted to csv complete")