import os
import csv
pathName = os.getcwd()
print(pathName)
csvpath = os.path.join(pathName, "election.csv")
print(csvpath)
# Open and read csv
with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    print(csvreader)
#-------------------------------------------------------------------------------------------------
# Read through each row of data after the header 
    csv_header = next(csvreader)
    print("Header:", csv_header)
    #csv_header = next(csvreader, None) 

# 1) total number of votes cast (== total number of rows [0] - header row)

def TotalVoteCount(electiondata):
    
    TotalVoteCount = []
    row_numbers = 0
    for row in voters_csv:
        row_numbers=row_numbers + 1
    return row_numbers
    
    TotalVoteCount.append(row_numbers)
    print(row_numbers)
# 2) complete list of candidates who received votes

# 3) percentage of votes each candidate won
    #  % = total number of votes each candidate won / TotalVote casted
# 4) total number of votes each candidate won
    # aggregate voter ID by candidate 
# 5) winner of the election based on popular vote
    # filter/arrange list based on % won