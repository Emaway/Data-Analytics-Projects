
## UC Berkeley Bootcamp Mission to Mars Homework

Objective:- to build a web application that scrapes various websites for data related to the Mission to Mars 
and displays the information in a single HTML page

Methods:- 
- scrape [NASA Mars News Site](https://mars.nasa.gov/news/) and collect the latest News Title and Paragraph Text
- scrape [Featured Space Image Url](https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars) and get image url for the current Featured Mars Image
- scrape the latest Mars weather tweet from the page [Mars Weather twitter account](https://twitter.com/marswxreport?lang=en)
- scrape [Mars Facts webpage] (http://space-facts.com/mars/) table containing facts about the planet including Diameter, Mass, etc. 
- scrape [USGS Astrogeology site](https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars) to obtain high resolution images for each of Mar's hemispheres
- use MongoDB to store scraped informations above
- Use MongoDB with Flask templating to create a new HTML page that displays all of the information scraped above


Technologies 

- Python 
  - Jupyter Notebook
  - Pandas
  - MongoDB
  - Flask app
  - BeautifulSoup 
  - HTML
  
  Requirements  
  - chromedriver.exe
  - requirements.txt 


Contents include:

- Jupyther Notebook called mission_to_mars-final contains scraping codes.
- Python script called scrape_mars contains scraping codes.
- Python script called app.py renders data from Mongodb to HTML to display mars data.
- HTML file called index.html. 


