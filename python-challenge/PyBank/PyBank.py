#Import os module
import os
# import csv module for reading csv files
import csv
pathName = os.getcwd()
print(pathName)
csvpath = os.path.join(pathName, "budget_data.csv")

print(csvpath)

with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    
    print(csvreader)

# Read the header row first 
    csv_header = next(csvreader)
    print("Header:", csv_header)
# Read through each row of data after the header
    for row in csvreader:
        print(row) 