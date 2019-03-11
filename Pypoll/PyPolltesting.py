import os
import csv
electioncsv = os.path.join('..', "Pypoll", "election.csv")
#csvpath = open(r'C:\Users\emame\Desktop\Homework3\python-challenge\Pypoll\election.csv')
#print(csvpath) 
# Open and read csv
with open(electioncsv, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",") 
    print(csvreader) 
# Read the header row first 
    csv_header = next(csvreader) 
    print("Header:", csv_header)
    #csv_header = next(csvreader, None)
# Header: ['Voter ID', 'County', 'Candidate']
#-------------------------------------------------------------------------------------------------
# loop through each row of data after the header to get total number of votes cast 
# (== total number of rows - header row)
VoteCount = 0
TotalVoteCount = []
Candidate_selected = []
for row in csvreader: 
    VoteCount = VoteCount + 1 
    Candidate = row[2]
    if Candidate not in Candidate_selected:
        Candidate_selected.append(Candidate)
        TotalVoteCount[Candidate] = 0
    TotalVoteCount[Candidate] = TotalVoteCount[Candidate] + 1
# print out election results
    f"\n\nelection results\n" 
    f"-----------\n"
    f"total votes: {VoteCount}\n"
    f"----------\n" 
    print(election_result) 
with open(electioncsv, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",") 
    print(csvreader) 
#--------------------------------------------------------------------------------------
#  def Total(VoterCount): 
    #count_of_rows = sum int(row [0])
    #row = 0
    #for row in rows:
        #row = row + 1
        #return row
    #print(total(row))
#TotalVoteCount.append([int(Voter ID [0])] str(Candidate [2])) 
# 2) complete list of candidates who received votes
# 3) percentage of votes each candidate won
    #  % = total number of votes each candidate won / TotalVote casted
# 4) total number of votes each candidate won
    # aggregate voter ID by candidate 
# 5) winner of the election based on popular vote
    # filter/arrange list based on % won