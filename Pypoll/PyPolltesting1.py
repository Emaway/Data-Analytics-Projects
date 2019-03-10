import os
import csv
pathName = os.getcwd()
print(pathName)
csvpath = os.path.join(pathName, "election.csv")
print(csvpath)

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
with open(file_to_output,"w") as txt_file: 
    election_result = (
        f"\n\nelection results\n" 
        f"-------\n"
        f"total votes: {VoteCount}\n"
        f"-------\n" )
    print(election_result) 

# Open and read csv
with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    print(csvreader)