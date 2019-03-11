import os
import csv
import datetime

pathName = os.getcwd()
print(pathName)
csvpath = os.path.join(pathName, "budget_data.csv")
print(csvpath)

with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    print(csvreader)
#Read through each row of data
    csv_header = next(csvreader)
    print("Header:", csv_header)
       
#------------------------------------------------------------------------
# Header: ['Date', 'Profit/Losses']
# First row with data ['Jan-2010', '867884']
#data = []

Total = []
def totalnetAmount(BudgetData):
    Total = 0
for row in csvreader:
    total = total + 1
    row = int(row[1]) + 1
    return total
    print(total)

# row = ['Date', 'Profit/Losses']
    #row[0].Split(',')
    #Date = datetime._wrap_strftime(row[0], %m/%d/%y)
    #Profit/Losses = int(row[1])
    #data.append(['Date', 'Profit/Losses'])
#print(data[0])
#------------------------------------------------------------------------
# 1) compute total number of months included in the dataset
# 2) compute net total amount of "Profit/Losses" over the entire period
    # define total for profit/loss (sum of row [1])
  


#totalnetAmount = sum (int[1])
# 3) compute average of the changes in "Profit/Losses" over the entire period
#average = total / (len(row[1])-1)
# 4) compute greatest increase in profits (date and amount) over the entire period
# 5) compute greatest decrease in losses (date and amount) over the entire period