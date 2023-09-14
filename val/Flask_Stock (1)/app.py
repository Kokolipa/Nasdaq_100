
from flask import Flask
from routes.get_all_data import get_all_data
from routes.get_data_by_date import get_data_by_date_route
from routes.get_data_by_sector import get_data_by_sector_route

app = Flask(__name__)

# Registering the routes
get_all_data(app)
get_data_by_date_route(app)
get_data_by_sector_route(app)

if __name__ == "__main__":
    app.run(debug=True)
