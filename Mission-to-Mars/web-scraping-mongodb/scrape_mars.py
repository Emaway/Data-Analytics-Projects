
from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
from flask import Flask, render_template
from flask_pymongo import PyMongo
import requests

def scrape_url():
    executable_path = {'executable_path': 'chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless=False)

    url = 'https://mars.nasa.gov/news/'
    browser.visit(url)

    # ### NASA Mars News
    # * Scrape the [NASA Mars News Site](https://mars.nasa.gov/news/) and collect the latest News Title and Paragraph Text. Assign the text to variables that you can reference later.

    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    # find all articles which contains latest News Title and Paragraph Text
   
    latest_news = soup.find('li', class_= 'slide')
        # scrap latest News Title
    news_title = latest_news.find('div', class_='content_title').text
        # scrap latest News Paragraph 
    news_paragraph = latest_news.find('div', class_='article_teaser_body').text
        
    # # JPL Mars Space Images - Featured Image

    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)
    featured_img = browser.find_by_id("full_image")
    featured_img.click()
    browser.is_element_present_by_text("more info")
    information_img = browser.find_link_by_partial_text("more info")
    information_img.click()
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    # partial url
    relative_img_url = soup.select_one("figure.lede a img").get("src")
    # generate full url
    featured_image_url = f"https://www.jpl.nasa.gov{relative_img_url}"

    # # Mars Weather
    # * Visit the Mars Weather twitter account [here](https://twitter.com/marswxreport?lang=en) and scrape the latest Mars weather tweet from the page. Save the tweet text for the weather report as a variable called `mars_weather`.

    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser') 
    mars_weather = soup.find('div', class_= 'js-tweet-text-container').text
    
    # # Mars Facts

    url = 'https://space-facts.com/mars/'

    mars_table = pd.read_html(url)
    mars_table = mars_table[0]
    mars_table = mars_table.rename(columns = {0:'descriptions', 1:'values'})
    html_table = mars_table.to_html()

    # # Mars Hemispheres

    url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url)
    hemisphere_img = []
    hemisphere_length = browser.find_by_css("a.product-item h3")
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    titles = soup.find_all('div', class_='description')
    for i in range(len(hemisphere_length)):
        hems_img = {}  
        browser.find_by_css("a.product-item h3")[i].click()
        sample_img = browser.find_link_by_text("Sample").first
        hems_img["title"]= browser.find_by_css("h2.title").text
        hems_img["full_img_url"]=sample_img["href"]
        hemisphere_img.append(hems_img)
        browser.back()
    
    browser.quit() 

    mars_data = {
        "news_title": news_title,
        "news_paragraph": news_paragraph,
        "featured_image_url": featured_image_url,
        "mars_weather": mars_weather,
        "html_table":html_table,
        "hemisphere_img":hemisphere_img
        }
    print(mars_data)
    return mars_data

if __name__ == "__main__":
    scrape_url()

