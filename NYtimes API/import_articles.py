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
        'fl': 'headline,web_url,snippet',
        'sort': 'newest',
        'page': 1,
    }
    time.sleep(20)
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        articles = response.json().get('response', {}).get('docs', [])
        
        ## Check if there are no articles
        if len(articles) == 0:
            articles_data = [{"message": "No current articles to display"}]
            print(f"No articles found for {ticker}.")
        else:
            # Check if there are more than 5 articles, and if so, retrieve the first 5
            if len(articles) > 5:
                articles = articles[:5]
                print(f"Retrieved 5 articles for {ticker}. Total available: {len(articles)}.")
            else:
                print(f"Retrieved {len(articles)} articles for {ticker}. Total available: {len(articles)}.")
            
            articles_data = []
            for article in articles:
                article_data = {
                    "headline": article.get("headline", {}).get("main", ""),
                    "web_url": article.get("web_url", ""),
                    "snippet": article.get("snippet", ""),
                }
                articles_data.append(article_data)
        
        return articles_data
    else:
        print(f"Failed to retrieve articles for {ticker}. Status code: {response.status_code}")
        return None

# Function to retrieve articles for all stock tickers and store them in a JSON file
def get_and_export_articles():
    all_articles = {}  # Dictionary to store articles by ticker

    for ticker in ndq100:
        articles_for_ticker = get_articles_for_ticker(ticker)
        if articles_for_ticker:
            all_articles[ticker] = articles_for_ticker
        else:
            print(f"Failed to retrieve articles for {ticker}")

    # Export articles to a JSON file
    with open('nytimes_articles.json', 'w') as json_file:
        json.dump(all_articles, json_file, indent=4)
    print("Retrieval complete")

if __name__ == '__main__':
    get_and_export_articles()
