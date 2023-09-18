import requests
import time
import json
from Constants import ndq100
from keys import NYTIMES

API_KEY = NYTIMES

# Function to retrieve articles for a given stock ticker
def get_articles_for_ticker(ticker):
    base_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    params = {
        'api-key': API_KEY,
        'q': ticker,  # You can modify the query as needed
    }

    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to retrieve articles for {ticker}. Status code: {response.status_code}")
        return None

# Function to retrieve articles for all stock tickers and store them in a JSON file
def get_and_export_articles():
    all_articles = {}  # Dictionary to store articles by ticker

    for ticker in ndq100:
        articles_for_ticker = []
        for _ in range(5):  # Retrieve the first 5 articles for each ticker
            articles = get_articles_for_ticker(ticker)
            if articles:
                articles_for_ticker.extend(articles['response']['docs'])

            time.sleep(20)  # Sleep for 7 seconds to respect the rate limit (9 calls per minute)
            print(f"Retrieved article {_+1} of 5 for {ticker}")

        all_articles[ticker] = articles_for_ticker

    # Export articles to a JSON file
    with open('nytimes_articles.json', 'w') as json_file:
        json.dump(all_articles, json_file, indent=4)
    print ("Retrieval complete")

if __name__ == '__main__':
    get_and_export_articles()