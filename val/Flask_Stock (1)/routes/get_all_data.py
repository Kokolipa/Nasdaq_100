from flask import jsonify
import sqlite3
from datetime import datetime

DATABASE_PATH = "./nasdaq.sqlite"

# Example: http://localhost:5000/
def get_all_data(app):
    @app.route("/")
    def get_data():
        # Connect to the SQLite database
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        # Lists to store the final data
        tickers = []
        metadata_list = []
        trades_list = []
        
        # Fetch tickers and metadata
        cursor.execute("SELECT ticker_id, symbol, asset_type, name, description, currency, country, sector, industry FROM metadata;")
        metadata_rows = cursor.fetchall()
        
        for row in metadata_rows:
            ticker = row[0]
            tickers.append(ticker)

            
            # Append metadata
            metadata_list.append({
                "symbol": row[1],
                "type": row[2],
                "name": row[3],
                "description": row[4],
                "currency": row[5],
                "country": row[6],
                "sector": row[7].capitalize(),
                "industry": row[8]
            })
            
            # Fetch trade data for the current ticker
            cursor.execute("SELECT date, open, high, low, close, volume FROM data WHERE ticker_id=?", (ticker,))
            trade_rows = cursor.fetchall()
            
            dates = []
            open_prices = []
            high_prices = []
            low_prices = []
            close_prices = []
            volumes = []
            
            for trade in trade_rows:
                formatted_date = datetime.strptime(trade[0], '%Y-%m-%d').strftime('%d-%m-%Y')
                
                dates.append(formatted_date)
                open_prices.append(trade[1])
                high_prices.append(trade[2])
                low_prices.append(trade[3])
                close_prices.append(trade[4])
                volumes.append(trade[5])
            
            # Append trade data
            trades_list.append({
                "date": dates,
                "open_price": open_prices,
                "high": high_prices,
                "low": low_prices,
                "close": close_prices,
                "volume": volumes
            })

        # Construct the final JSON response
        response_data = {
            "tickers": tickers,
            "metadata": metadata_list,
            "trades": trades_list
        }
        
        return jsonify(response_data)