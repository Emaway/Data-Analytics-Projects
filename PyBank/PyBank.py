import os
import csv

pathName = os.getcwd()
print(pathName)
csvpath = os.path.join(pathName, "budget_data.csv")
print(csvpath)

with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    print(csvreader)
# Read through each row of data
    #for row in csvreader:
        #print(row [1])
#------------------------------------------------------------------------
# Header: 'Date', 'Profit/Losses']
# First row with data ['Jan-2010', '867884']
#------------------------------------------------------------------------
# 1) compute total number of months included in the dataset
# for row in csvreader:
def total(months):
    month_of_months = sum (rows [0])
sum = 0.0
for mon in months:
    sum = sum + mon
return sum 
print(total(rows [0]))
# 2) compute net total amount of "Profit/Losses" over the entire period
    # define total for profit/loss (sum of row [1])
    
#totalnetAmount = sum (int[1])
# 3) compute average of the changes in "Profit/Losses" over the entire period
#average = total / (len(row[1])-1)
# 4) compute greatest increase in profits (date and amount) over the entire period
# 5) compute greatest decrease in losses (date and amount) over the entire period