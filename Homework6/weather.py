container_list = []
print("Beginning Data Retrieval")
Record_counter = 1
setting = 1
for i, city in enumerate(cities):
    if(i%10 == 0 and i>=10):
        setting += 1
        Record_counter=0
    url = base_url + "&q=" + city
    print("Processing Record %s of Set %s | %s" %(Record_counter, setting, city)) 
    Record_counter += 1
    try:
        weather=requests.get(url).json()
        Temp = weather["main"]["temp"]
        Humid = weather["main"]["humidity"]
        Cloud = weather["clouds"]["all"]
        Wind = weather["wind"]["speed"]
        Lat = weather ["coord"]["lat"]
        Lng = weather ["coord"]["lon"]
        container_list.append({
            "City name":city,
            "Temprature":Temp,
            "Humidity":Humid,
            "Cloud":Cloud,
            "Windspeed":wind,
            "Latitude":Lat,
            "Longitude":Lng 
        })
    except:
        print("City not found. Skipping...")
        pass
        



cities_df = pd.DataFrame(container_list)
city = cities_df["City name"]
temp = cities_df["Temprature"]
humidity = cities_df["Humidity"]
cloud = cities_df["Cloud"]
wind = cities_df["Windspeed"]
lat = cities_df["Latitude"]
lat = cities_df["Longitude"]
cities_df.count()





