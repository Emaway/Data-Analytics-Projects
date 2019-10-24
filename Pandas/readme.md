
####  PyCity School District Analysis 

Objective:-  to perform descriptive statistical analyses by groups, and compare performances throughout the school district using defined parameters

Python Pandas Jupyter Notebook were used to read and load csv files into dataframe. Left join method were used to merge two csv files. District summary and school summary dataframe were created using pandas summary functions. Dataframe columns were aggregated by groupby function. 

To perform descriptive statistics by groups and understand patterns, and compare schools by performance, budget and test scores:-
 - dataframe columns were selected and rows were created using conditional in pandas concat function were used concatinate created rows
   to summurize test scores
 - aggregation were done using groupby
 - bins were created and pandas pd.cut method used to bin "Budget Per Student" and "school size" groups

Sample Summary dataframe statistics created <br /> <br />
  
<br />***Scores by School Spending***
![](https://github.com/Emaway/Data-Analytics-Projects/blob/master/Pandas/Images/Budget-per-student.PNG)<br />
<br /> <br />

<br />***Scores by School Size***
![](https://github.com/Emaway/Data-Analytics-Projects/blob/master/Pandas/Images/school-size.PNG)<br />
<br /> <br />

<br />***Top Performing Schools***
![](https://github.com/Emaway/Data-Analytics-Projects/blob/master/Pandas/Images/top-performing-schools.PNG)
