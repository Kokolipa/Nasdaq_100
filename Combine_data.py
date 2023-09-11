import os
import pandas as pd

# Directory where the individual stock data files are located
data_folder = 'stockdata'

# Initialize an empty DataFrame to store the combined data
combined_data = pd.DataFrame()

# List all files in the data folder
files = os.listdir(data_folder)

# Loop through each file in the folder
for file in files:
    # Check if the file is a CSV file
    if file.endswith('.csv'):
        # Read the CSV file into a DataFrame
        file_path = os.path.join(data_folder, file)
        stock_data = pd.read_csv(file_path)

        # Add a column to identify the stock code
        stock_code = file.split('_')[0]
        stock_data['Stock Code'] = stock_code

        # Concatenate the stock data to the combined DataFrame
        combined_data = pd.concat([combined_data, stock_data], ignore_index=True)

# Save the combined data to a single CSV file
combined_file_path = 'stockdata/1_combined_stock_data.csv'
combined_data.to_csv(combined_file_path, index=False)

print(f'Combined data saved to {combined_file_path}')
